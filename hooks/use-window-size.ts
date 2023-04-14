import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";

const MOBILE_BREAKPOINT = 600;
const TABLET_BREAKPOINT = 960;
const DESKTOP_BREAKPOINT_XXL = 1690;

type DataTableInfo = {
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isMobileTablet: boolean;
  isDesktop: boolean;
  isDesktopLarge: boolean;
  isReady: boolean;
};

export function useWindowSize(): DataTableInfo {
  const [windowState, setWindowState] = useState<DataTableInfo>({
    windowWidth: 9999,
    isMobile: false,
    isTablet: false,
    isMobileTablet: false,
    isDesktop: false,
    isDesktopLarge: false,
    isReady: false,
  });

  const setWindowStateCallback = useCallback(() => {
    const iw = window.innerWidth;

    setWindowState({
      windowWidth: iw,
      isMobile: iw < MOBILE_BREAKPOINT,
      isTablet: iw <= TABLET_BREAKPOINT && iw > MOBILE_BREAKPOINT,
      isMobileTablet: iw <= TABLET_BREAKPOINT,
      isDesktop: iw < DESKTOP_BREAKPOINT_XXL && iw > TABLET_BREAKPOINT,
      isDesktopLarge: iw >= DESKTOP_BREAKPOINT_XXL,
      isReady: true,
    });
  }, []);

  const windowListener = debounce(() => {
    setWindowStateCallback();
  }, 333);

  useEffect(() => {
    setWindowStateCallback();
    window.addEventListener("resize", windowListener);

    return () => {
      window.removeEventListener("resize", windowListener);
    };
  }, []);

  return windowState;
}