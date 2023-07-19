import { useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";

export function usePersistentRecoilState<T>(key: string, atom: RecoilState<T>): [T, (newValue: T) => void] {
  const [state, setState] = useRecoilState(atom);
  const [hasLoadedState, setHasLoadedState] = useState(false);

  useEffect(() => {
    const persistedState = localStorage.getItem(key);

    if (persistedState !== null) {
      setState(JSON.parse(persistedState));
    }

    setHasLoadedState(true);
  }, [key, setState]);

  useEffect(() => {
    if (hasLoadedState) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, hasLoadedState]);

  return [state, setState];
}
