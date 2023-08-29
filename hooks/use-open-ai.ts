import { filterState } from "context/filterContext";
import { loadingContext } from "context/loadingContext";
import { useState, useEffect, useCallback, useMemo, useRef, useContext } from "react";
import { useRecoilState } from "recoil";
import { useChat } from "ai/react";
import { openaiCacheContext } from "context/openaiCacheContext";
import { openaiIdsContext } from "context/openaiIdsContext";
import { IsDevContext } from "context/isDevContext";
import { PresetType } from "context/openaiDropdownContext";
import { OpenAiResponseType, VariantType } from "types/openai";

interface OpenAiHookType {
  preset: PresetType;
}

const openaiResponseInitialState: OpenAiResponseType = {
  living: {
    explainedLikeAlocal: "",
    greenFlags: "",
    redFlags: "",
  },
  domesticTourism: "",
  internationalTourism: "",
  shortTermRental: "",
  buyAndHold: "",
};

export const useOpenAi = ({ preset }: OpenAiHookType) => {
  const [
    {
      living,
      buyAndHold,
      shortTermRental,
      domesticTourism,
      internationalTourism,
      glamping,
      corporateRelocation,
      luxuryEstates,
      realEstateDeveloper,
      retireeLiving,
      vacationHome,
    },
    setOpenAiResponse,
  ] = useState<OpenAiResponseType>(openaiResponseInitialState);
  const [filterVal] = useRecoilState(filterState);
  const [loading, setLoading] = useRecoilState(loadingContext);
  const [openaiCache, setOpenaiCache] = useRecoilState(openaiCacheContext);
  const idRef = useRef<string[]>([]);
  const [openaiIds, setOpenaiIds] = useRecoilState(openaiIdsContext);
  const [variant, setVariant] = useState<VariantType>("explainedLikeAlocal");
  const { isDev } = useContext(IsDevContext);

  const isLivingPreset = useMemo(() => {
    if (preset !== "living") {
      return null;
    } else {
      return {
        explainedLikeAlocal: variant === "explainedLikeAlocal",
        greenFlags: variant === "greenFlags",
        redFlags: variant === "redFlags",
      };
    }
  }, [preset, variant]);

  const params = useMemo(() => {
    if (!filterVal.address) {
      return "";
    }

    const addressAndPreset = `?address=${filterVal.address}&preset=${preset}`;

    if (isLivingPreset) {
      return `${addressAndPreset}&variant=${variant}`;
    }

    if (preset === "domesticTourism") {
      return `${addressAndPreset}&city=${filterVal.city}`;
    }

    if (preset === "internationalTourism") {
      return `${addressAndPreset}&country=${filterVal.country}&city=${filterVal.city}`;
    }

    return `${addressAndPreset}`;
  }, [filterVal, preset, variant, isLivingPreset]);

  const { messages, append, stop, setMessages } = useChat({
    api: `/api/openai${params}`,
    body: {
      explainedLikeAlocal: isLivingPreset?.greenFlags && living?.explainedLikeAlocal,
      greenFlags: isLivingPreset?.redFlags && living?.greenFlags,
    },
    onError: (error) => {
      console.error(error);
    },
    onFinish: (message) => {
      try {
        if (JSON.parse(message.content).error) {
          return;
        }
      } catch (error) {
        console.error(error);
      }

      if (isLivingPreset) {
        if (isLivingPreset.explainedLikeAlocal) {
          setVariant("greenFlags");
          updateOpenAiCache("living", message.content, "explainedLikeAlocal");
          return;
        } else if (isLivingPreset.greenFlags) {
          setVariant("redFlags");
          updateOpenAiCache("living", message.content, "greenFlags");
          return;
        } else if (isLivingPreset.redFlags) {
          setVariant("explainedLikeAlocal");
          updateOpenAiCache("living", message.content, "redFlags");
          return;
        }
      } else {
        updateOpenAiCache(preset, message.content);
      }
    },
  });

  useEffect(() => {
    stop();
  }, [preset]);

  const setOpenaiResponseCallback = useCallback(
    (preset: PresetType, state?: string, variant?: VariantType) => {
      if (isLivingPreset && variant) {
        setOpenAiResponse((prevState) => ({
          ...prevState,
          living: {
            ...prevState.living,
            [variant]: state,
          },
        }));
      } else {
        setOpenAiResponse((prevState) => ({
          ...prevState,
          [preset]: state,
        }));
      }
    },
    [isLivingPreset],
  );

  const updateOpenAiCache = useCallback(
    (preset: PresetType, state?: string, variant?: VariantType) => {
      if (!filterVal.address || !state) {
        return;
      }

      if (isLivingPreset && variant) {
        setOpenaiCache((prevState) => ({
          ...prevState,
          [filterVal.address as string]: {
            ...prevState[filterVal.address as string],
            living: {
              ...prevState[filterVal.address as string]?.living,
              [variant]: state,
            },
          },
        }));
      } else {
        setOpenaiCache((prevState) => ({
          ...prevState,
          [filterVal.address as string]: {
            ...prevState[filterVal.address as string],
            [preset]: state,
          },
        }));
      }
    },
    [filterVal.address, isLivingPreset],
  );

  const setLoadingCallback = useCallback(
    (preset: PresetType, variant?: VariantType) => {
      if (preset === "living" && variant) {
        if (!loading.openai.living[variant]) {
          return;
        }

        setLoading((prevState) => ({
          ...prevState,
          openai: {
            ...prevState.openai,
            living: {
              ...prevState.openai.living,
              [variant]: false,
            },
          },
        }));
      } else {
        if (!loading.openai[preset]) {
          return;
        }

        setLoading((prevState) => ({
          ...prevState,
          openai: {
            ...prevState.openai,
            [preset]: false,
          },
        }));
      }
    },
    [loading.openai],
  );

  useEffect(() => {
    if (isLivingPreset?.greenFlags || isLivingPreset?.redFlags) {
      append({
        content: "",
        role: "user",
      });
    }
  }, [isLivingPreset]);

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

  useEffect(() => {
    if (isDev) {
      return;
    }

    if (idRef.current) {
      const removedDuplicates = idRef.current.filter((id) => !openaiIds.includes(id));

      setOpenaiIds((prevState) => [...prevState, ...removedDuplicates]);
    }

    if (message) {
      setMessages([]);
    }

    if (living?.explainedLikeAlocal || buyAndHold || shortTermRental) {
      setOpenAiResponse(openaiResponseInitialState);
    }

    if (!filterVal.address) {
      return;
    }

    const cache = openaiCache[filterVal.address as string] as OpenAiResponseType | undefined;

    if (isLivingPreset) {
      if (cache?.living?.explainedLikeAlocal) {
        setOpenaiResponseCallback("living", cache.living?.explainedLikeAlocal, "explainedLikeAlocal");
        setLoadingCallback("living", "explainedLikeAlocal");

        if (!cache.living?.greenFlags) {
          setVariant("greenFlags");
          return;
        }
      }

      if (cache?.living?.greenFlags) {
        setOpenaiResponseCallback("living", cache.living?.greenFlags, "greenFlags");
        setLoadingCallback("living", "greenFlags");

        if (!cache.living?.redFlags) {
          setVariant("redFlags");
          return;
        }
      }

      if (cache?.living?.redFlags) {
        setOpenaiResponseCallback("living", cache.living?.redFlags, "redFlags");
        setLoadingCallback("living", "redFlags");
        return;
      }
    } else {
      if (cache?.[preset]) {
        setOpenaiResponseCallback(preset, cache[preset] as string);
        setLoadingCallback(preset);
        return;
      }
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
  }, [filterVal.address, preset]);

  useEffect(() => {
    if (!message || !message.content) {
      return;
    }

    setLoadingCallback(preset, variant);
    setOpenaiResponseCallback(preset, message.content, variant);
  }, [message]);

  return {
    living,
    buyAndHold,
    shortTermRental,
    domesticTourism,
    internationalTourism,
    glamping,
    realEstateDeveloper,
    vacationHome,
    retireeLiving,
    corporateRelocation,
    luxuryEstates,
  };
};
