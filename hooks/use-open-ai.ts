import { filterState } from "context/filterContext";
import { loadingContext } from "context/loadingContext";
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";

interface OpenAiResponseType {
  explainedLikeAlocal?: string;
  greenFlags?: string;
  redFlags?: string;
}

type VariantType = "explainedLikeAlocal" | "greenFlags" | "redFlags" | "all";

export const useOpenAi = () => {
  const [{ explainedLikeAlocal, greenFlags, redFlags }, setOpenAiResponse] = useState<OpenAiResponseType>({});
  const [filterVal] = useRecoilState(filterState);
  const [loading, setLoading] = useRecoilState(loadingContext);

  const setLoadingCallback = useCallback((variant: VariantType, state: boolean) => {
    if (variant === "all") {
      return setLoading((prevState) => ({
        ...prevState,
        openai: {
          explainedLikeAlocal: state,
          greenFlags: state,
          redFlags: state,
        },
      }));
    }

    setLoading((prevState) => ({
      ...prevState,
      openai: {
        ...prevState.openai,
        [variant]: state,
      },
    }));
  }, []);

  useEffect(() => {
    setOpenAiResponse({
      explainedLikeAlocal: "",
      greenFlags: "",
      redFlags: "",
    });
    if (!filterVal.address) {
      return;
    }

    const eventSource = new EventSource(`/api/openai?address=${filterVal.address}`);

    eventSource.onmessage = (event) => {
      if (event.data === "[FINISHED]") {
        eventSource.close();
        return;
      }

      const data = JSON.parse(event.data);

      if (loading.openai[data.variant as keyof typeof loading.openai]) {
        setLoadingCallback(data.variant, false);
      }
      setOpenAiResponse((prevState) => ({
        ...prevState,
        [data.variant]: prevState[data.variant as keyof typeof prevState] + data?.content,
      }));
    };

    eventSource.onerror = (error) => {
      eventSource.close();
      console.error(error);
    };
  }, [filterVal.address]);

  return {
    explainedLikeAlocal,
    greenFlags,
    redFlags,
  };
};
