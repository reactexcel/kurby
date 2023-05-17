import { useEffect, useState, createContext, useRef, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

/*

Setting up an auth context to be used globally
*/

interface AuthContextType {
  user: any;
  isLoading: boolean;
  openLoginSignup: () => void;
  openProfile: () => void;
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
  const [outsetaToken, setOutsetaToken] = useState<string>("");
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
    }

    const token = outsetaRef.current?.getAccessToken();

    if (token) {
      setOutsetaToken(token);
      getUser();

      if (router.pathname === "/") {
        router.push("/app/Miami--FL--USA");
      }
    }

    setStatus("ready");

    return () => {
      handleOutsetaUserEvents(() => {});
    };
  }, [searchParams]);

  useEffect(() => {
    if (outsetaToken) {
      const xanoToken = localStorage.getItem("xanoToken");

      if (!xanoToken) {
        getXanoToken(outsetaToken);
      }
    }
  }, [outsetaToken]);

  const getUser = async () => {
    const outsetaUser = await outsetaRef.current?.getUser();
    setUser(outsetaUser);
  };

  const getXanoToken = async (outsetaToken: string) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_XANO_API}/outseta/auth`, {
      token: outsetaToken,
    });

    localStorage.setItem("xanoToken", data.authToken);
  };

  const handleOutsetaUserEvents = (onEvent: any) => {
    const outseta = outsetaRef.current;
    outseta?.on("subscription.update", onEvent);
    outseta?.on("profile.update", onEvent);
    outseta?.on("account.update", onEvent);
  };

  const logout = () => {
    outsetaRef.current?.setAccessToken("");
    localStorage.removeItem("xanoToken");
    setUser(null);
  };

  const openLoginSignup = () => {
    outsetaRef.current?.auth.open({
      widgetMode: "login|register",
      authenticationCallbackUrl: window.location.href,
      planUid: "pWrwqamn",
      planPaymentTerm: "month",
      skipPlanOptions: true,
    });
  };

  const openProfile = () => {
    outsetaRef.current?.profile?.open({ tab: "profile" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status !== "ready",
        logout,
        openLoginSignup,
        openProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
