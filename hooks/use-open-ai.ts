import { filterState } from "context/filterContext";
import { loadingContext } from "context/loadingContext";
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";

interface OpenAiResponseType {
  explainedLikeAlocal?: string;
  greenFlags?: string[];
  redFlags?: string[];
}

type VariantType = "explainedLikeAlocal" | "greenFlags" | "redFlags" | "all";

const request = async (params: any) => {
  try {
    const response = await fetch(`/api/openai`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {};
  }
};

export const useOpenAi = () => {
  const [{ explainedLikeAlocal, greenFlags, redFlags }, setOpenAiResponse] = useState<OpenAiResponseType>({});
  const [filterVal] = useRecoilState(filterState);
  const [, setLoading] = useRecoilState(loadingContext);

  const setOpenAiResponseCallback = useCallback((variant: VariantType, response: string) => {
    setOpenAiResponse((prevState) => ({
      ...prevState,
      [variant]: response,
    }));
  }, []);

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
    if (explainedLikeAlocal || greenFlags || redFlags) {
      setOpenAiResponse({});
      setLoadingCallback("all", true);
    }

    if (!filterVal.address) return;

    request({ ...filterVal.selectedPlace, variant: "explainedLikeAlocal" })
      .then((response) => {
        setOpenAiResponseCallback("explainedLikeAlocal", response);
        setLoadingCallback("explainedLikeAlocal", false);

        return response;
      })
      .then(async (response) => {
        const r = await request({ ...filterVal.selectedPlace, variant: "greenFlags", message: response || "" }).then((response) => {
          setOpenAiResponseCallback("greenFlags", response);
          setLoadingCallback("greenFlags", false);

          return response;
        });

        return r;
      })
      .then(async (response) => {
        await request({ ...filterVal.selectedPlace, variant: "redFlags", message: response || "" }).then((response) => {
          setOpenAiResponseCallback("redFlags", response);
          setLoadingCallback("redFlags", false);
        });
      })
      .catch((error) => {
        console.error(error);

        setLoadingCallback("all", false);
      });
  }, [filterVal.address, filterVal.selectedPlace]);

  return {
    explainedLikeAlocal,
    greenFlags,
    redFlags,
  };
};
