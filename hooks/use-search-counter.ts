import { IsDevContext } from "context/isDevContext";
import { searchContext } from "context/searchCounter";
import { useAuth } from "providers/AuthProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const initialValues = () => {
  const date = new Date();

  return { count: "0", date: new Date(date.getTime() - date.getTimezoneOffset() * 60000) };
};

export const useSearchCounter = () => {
  const { user } = useAuth();
  const [{ count, searchLimit }, setCounter] = useRecoilState(searchContext);
  const [date, setDate] = useState<Date>(new Date());
  const { isDev } = useContext(IsDevContext);

  const hasDateExpired = (date: Date) => {
    date.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date.getTime() < today.getTime();
  };

  const resetCounterStorage = useCallback(() => {
    window.localStorage.setItem("searchCounter", JSON.stringify(initialValues()));
  }, []);
  const setCounterCallback = useCallback((key: "count" | "searchLimit", value: string | boolean) => setCounter((prev) => ({ ...prev, [key]: value })), []);
  const resetCounter = useCallback(() => setCounter(() => ({ searchLimit: false, count: "0" })), []);

  useEffect(() => {
    const item = window.localStorage.getItem("searchCounter");
    let searchCounterStorage = JSON.parse(item || "null");

    if (!searchCounterStorage) {
      resetCounterStorage();
      searchCounterStorage = initialValues();
    }

    if (searchCounterStorage?.date && hasDateExpired(new Date(searchCounterStorage.date))) {
      setDate(new Date());
      resetCounter();
      resetCounterStorage();
    } else {
      setDate(searchCounterStorage.date);
      setCounterCallback("count", searchCounterStorage.count || "0");
    }
  }, [user]);

  useEffect(() => {
    if (!user && !isDev && count !== "0") {
      window.localStorage.setItem("searchCounter", JSON.stringify({ count, date }));
    }

    if (+count > 4 && !searchLimit) {
      setCounterCallback("searchLimit", true);
    } else if (+count <= 4 && searchLimit) {
      setCounterCallback("searchLimit", false);
    }
  }, [count]);

  const incrementCounter = () => {
    if (!user && !isDev) {
      setCounterCallback("count", (+count + 1).toString());
    }
  };

  return { searchLimit, incrementCounter };
};
