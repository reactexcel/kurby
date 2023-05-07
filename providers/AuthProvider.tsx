import { useEffect, useState, createContext, useRef, useContext } from "react";
import { useRouter } from "next/router";

/*

Setting up an auth context to be used globally
*/

interface AuthContextType {
  user: any;
  isLoading: boolean;
  openLogin: (options?: any) => void;
  openSignup: (options?: any) => void;
  openProfile: (options?: any) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const searchParams = router.query;
  const [status, setStatus] = useState("init");
  const [user, setUser] = useState<any>();
  const outsetaRef = useRef<any>(null);

  useEffect(() => {
    if (window["Outseta" as any]) {
      outsetaRef.current = window["Outseta" as any];
    } else {
      throw new Error("Outseta is missing, have you added the script to head?");
    }
  }, []);

  useEffect(() => {
    const accessToken = searchParams["access_token"];

    if (accessToken) {
      outsetaRef.current?.setAccessToken(accessToken);
      router.replace(router.pathname);
    }

    if (outsetaRef.current?.getAccessToken()) {
      updateUser();
    } else {
      setStatus("ready");
    }

    return () => {
      handleOutsetaUserEvents(() => {});
    };
  }, [searchParams]);

  const updateUser = async () => {
    const outsetaUser = await outsetaRef.current?.getUser();
    setUser(outsetaUser);
    setStatus("ready");
  };

  const handleOutsetaUserEvents = (onEvent: any) => {
    const outseta = outsetaRef.current;
    outseta?.on("subscription.update", onEvent);
    outseta?.on("profile.update", onEvent);
    outseta?.on("account.update", onEvent);
  };

  const logout = () => {
    outsetaRef.current?.setAccessToken("");
    setUser(null);
  };

  const openLogin = (options: any) => {
    outsetaRef.current?.auth.open({
      widgetMode: "login|register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openSignup = (options: any) => {
    outsetaRef.current?.auth?.open({
      widgetMode: "register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openProfile = (options: any) => {
    outsetaRef.current?.profile?.open({ tab: "profile", ...options });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status !== "ready",
        logout,
        openLogin,
        openSignup,
        openProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
