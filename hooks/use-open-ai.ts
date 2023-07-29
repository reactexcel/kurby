import { filterState } from "context/filterContext";
import { loadingContext } from "context/loadingContext";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRecoilState } from "recoil";
import { useChat } from "ai/react";
import { openaiCacheContext } from "context/openaiCacheContext";
import { openaiIdsContext } from "context/openaiIdsContext";

interface OpenAiResponseType {
  explainedLikeAlocal?: string;
  greenFlags?: string;
  redFlags?: string;
}

type VariantType = "explainedLikeAlocal" | "greenFlags" | "redFlags";

export const useOpenAi = () => {
  const [{ explainedLikeAlocal, greenFlags, redFlags }, setOpenAiResponse] = useState<OpenAiResponseType>({});
  const [filterVal] = useRecoilState(filterState);
  const [loading, setLoading] = useRecoilState(loadingContext);
  const [openaiCache, setOpenaiCache] = useRecoilState(openaiCacheContext);
  const idRef = useRef<string[]>([]);
  const [openaiIds, setOpenaiIds] = useRecoilState(openaiIdsContext);
  const [variant, setVariant] = useState<VariantType>("explainedLikeAlocal");
  const { messages, append, stop, setMessages } = useChat({
    api: `/api/openai?address=${filterVal.address}&variant=${variant}`,
    onFinish: (message) => {
      if (variant === "explainedLikeAlocal") {
        setVariant("greenFlags");
        updateOpenAiCache("explainedLikeAlocal", message.content);
        return;
      } else if (variant === "greenFlags") {
        setVariant("redFlags");
        updateOpenAiCache("greenFlags", message.content);
        return;
      } else if (variant === "redFlags") {
        setVariant("explainedLikeAlocal");
        updateOpenAiCache("redFlags", message.content);
        return;
      }
    },
  });

  const setOpenaiResponseCallback = useCallback((variant: VariantType | "all", state?: string) => {
    if (variant === "all") {
      setOpenAiResponse({
        explainedLikeAlocal: state,
        greenFlags: state,
        redFlags: state,
      });
    }

    setOpenAiResponse((prevState) => ({
      ...prevState,
      [variant]: state,
    }));
  }, []);

  const updateOpenAiCache = useCallback(
    (variant: VariantType, state?: string) => {
      if (!filterVal.address || !state) {
        return;
      }

      setOpenaiCache((prevState) => ({
        ...prevState,
        [filterVal.address as string]: {
          ...prevState[filterVal.address as string],
          [variant]: state,
        },
      }));
    },
    [filterVal.address],
  );

  const setLoadingCallback = useCallback(
    (variant: VariantType) => {
      if (!loading.openai[variant]) {
        return;
      }

      setLoading((prevState) => ({
        ...prevState,
        openai: {
          ...prevState.openai,
          [variant]: false,
        },
      }));
    },
    [loading.openai],
  );

  useEffect(() => {
    if (variant === "greenFlags" || variant === "redFlags") {
      append({
        content: "",
        role: "user",
      });
    }
  }, [variant]);

  const message = useMemo(() => {
    if (!messages.length) {
      return null;
    }

    const validMessage = messages.filter((message) => message.content && !openaiIds.includes(message.id))[0];

    if (validMessage && !idRef.current.includes(validMessage.id)) {
      idRef.current = [...idRef.current, validMessage.id];
    }

    return validMessage;
  }, [messages]);

  console.log(idRef.current);

  useEffect(() => {
    if (idRef.current) {
      const removedDuplicates = idRef.current.filter((id) => !openaiIds.includes(id));

      setOpenaiIds((prevState) => [...prevState, ...removedDuplicates]);
    }
    setMessages([]);
    setOpenaiResponseCallback("all", "");
    if (!filterVal.address) {
      return;
    }

    const cache = openaiCache[filterVal.address as string];

    if (cache?.explainedLikeAlocal) {
      setOpenaiResponseCallback("explainedLikeAlocal", cache?.explainedLikeAlocal);
      setLoadingCallback("explainedLikeAlocal");

      if (!cache?.greenFlags) {
        setVariant("greenFlags");
        return;
      }
    }

    if (cache?.greenFlags) {
      setOpenaiResponseCallback("greenFlags", cache?.greenFlags);
      setLoadingCallback("greenFlags");

      if (!cache?.redFlags) {
        setVariant("redFlags");
        return;
      }
    }

    if (cache?.redFlags) {
      setOpenaiResponseCallback("redFlags", cache?.redFlags);
      setLoadingCallback("redFlags");
      return;
    }

    const timeout = setTimeout(() => {
      append({
        content: "",
        role: "user",
      });
    }, 3000);

    return () => {
      clearTimeout(timeout);
      setVariant("explainedLikeAlocal");
      stop();
    };
  }, [filterVal.address]);

  useEffect(() => {
    if (!message || !message.content) {
      return;
    }

    setLoadingCallback(variant);
    setOpenaiResponseCallback(variant, message.content);
  }, [message]);

  return {
    explainedLikeAlocal,
    greenFlags,
    redFlags,
  };
};
