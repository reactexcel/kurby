import { filterState } from "context/filterContext";
import { loadingContext } from "context/loadingContext";
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { useChat } from "ai/react";

interface OpenAiResponseType {
  explainedLikeAlocal?: string;
  greenFlags?: string;
  redFlags?: string;
}

type VariantType = "explainedLikeAlocal" | "greenFlags" | "redFlags";

export const useOpenAi = () => {
  const [{ explainedLikeAlocal, greenFlags, redFlags }, setOpenAiResponse] = useState<OpenAiResponseType>({});
  const [filterVal] = useRecoilState(filterState);
  const [, setLoading] = useRecoilState(loadingContext);
  const [variant, setVariant] = useState<VariantType>("explainedLikeAlocal");
  const { messages, append } = useChat({
    api: `/api/openai?address=${filterVal.address}&variant=${variant}`,
    onFinish: () => {
      if (variant === "explainedLikeAlocal") {
        setVariant("greenFlags");
      } else if (variant === "greenFlags") {
        setVariant("redFlags");
      } else if (variant === "redFlags") {
        setVariant("explainedLikeAlocal");
      }
    },
  });

  const setLoadingCallback = useCallback((variant: VariantType, state: boolean) => {
    setLoading((prevState) => ({
      ...prevState,
      openai: {
        ...prevState.openai,
        [variant]: state,
      },
    }));
  }, []);

  useEffect(() => {
    if (variant === "greenFlags" || variant === "redFlags") {
      append({
        content: "",
        role: "user",
      });
    }
  }, [variant]);

  useEffect(() => {
    setOpenAiResponse(() => ({
      explainedLikeAlocal: "",
      greenFlags: "",
      redFlags: "",
    }));
    if (!filterVal.address) {
      return;
    }

    append({
      content: "",
      role: "user",
    });
  }, [filterVal.address]);

  useEffect(() => {
    if (!messages.length) {
      return;
    }

    const validMessage = messages.filter((message) => message.content);

    if (!validMessage.length) {
      return;
    }

    setLoadingCallback(variant, false);
    setOpenAiResponse((prevState) => ({
      ...prevState,
      [variant]: validMessage[0]?.content,
    }));
  }, [messages]);

  return {
    explainedLikeAlocal,
    greenFlags,
    redFlags,
  };
};
