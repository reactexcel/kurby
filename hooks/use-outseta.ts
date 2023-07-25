import { useRef, useEffect } from "react";

export function useOutseta() {
  const outsetaRef = useRef<any>(null);

  useEffect(() => {
    if (window["Outseta" as any]) {
      outsetaRef.current = window["Outseta" as any];
    } else {
      throw new Error("Outseta is missing, have you added the script to head?");
    }
  }, []);

  return outsetaRef;
}
