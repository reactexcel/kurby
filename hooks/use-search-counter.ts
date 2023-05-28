import { searchContext } from "context/searchCounter";
import { useAuth } from "providers/AuthProvider";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

export const useSearchCounter = () => {
  const { user } = useAuth();
  const [{ count }, setCounter] = useRecoilState(searchContext);

  useEffect(() => {
    if (!user) {
      let searchCounterStorage = window.localStorage.getItem("searchCounter");

      if (!searchCounterStorage) {
        window.localStorage.setItem("searchCounter", "0");
      }

      setCounter(() => ({
        count: searchCounterStorage || "0",
      }));
    } else {
      setCounter((prev) => ({
        ...prev,
        count: "0",
      }));
      window.localStorage.removeItem("searchCounter");
    }
  }, [user]);

  useEffect(() => {
    if (!user && count !== "0") {
      window.localStorage.setItem("searchCounter", count);
    }
  }, [count]);

  const incrementCounter = () =>
    setCounter((prev) => ({
      ...prev,
      count: (+prev.count + 1).toString(),
    }));

  const searchLimit = useMemo(() => count && +count > 5, [count]);

  return { searchLimit, incrementCounter };
};
