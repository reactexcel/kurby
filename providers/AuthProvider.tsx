import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useOutseta } from "hooks/use-outseta";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  openLoginSignup: () => void;
  openProfile: () => void;
  logout: () => void;
  outsetaToken: string;
  xanoToken: string;
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
  const [xanoToken, setXanoToken] = useState<string>("");
  const outsetaRef = useOutseta();

  const handleLogin = () => {
    localStorage.removeItem("searchCounter");
    // router.push("/app/Miami--FL--USA");
    // router.push(window.location.href);
  };

  useEffect(() => {
    const accessToken = searchParams["access_token"];

    if (accessToken) {
      console.log(outsetaRef.current);
      outsetaRef.current?.setAccessToken(accessToken);
    }

    const token = outsetaRef.current?.getAccessToken();

    if (token) {
      setOutsetaToken(token);
      getUser();
    }

    setStatus("ready");

    return () => {
      handleOutsetaUserEvents(() => {});
    };
  }, [searchParams]);

  useEffect(() => {
    if (user && router.pathname === "/") {
      handleLogin();
    }
  }, [user]);

  useEffect(() => {
    if (outsetaToken) {
      const xanoToken = sessionStorage.getItem("xanoToken");

      if (!xanoToken) {
        getXanoToken(outsetaToken);
      } else {
        setXanoToken(xanoToken);
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

    sessionStorage.setItem("xanoToken", data.authToken);
    setXanoToken(data.authToken);
  };

  const handleOutsetaUserEvents = (onEvent: any) => {
    const outseta = outsetaRef.current;
    outseta?.on("subscription.update", onEvent);
    outseta?.on("profile.update", onEvent);
    outseta?.on("account.update", onEvent);
  };

  const logout = () => {
    outsetaRef.current?.setAccessToken("");
    sessionStorage.removeItem("xanoToken");
    setUser(null);
    router.push({
      pathname: router.pathname,
      query: {},
    });
    window.location.reload();
  };

  const openLoginSignup = () => {
    if (!outsetaRef.current?.auth) {
      router.push("https://kurby.outseta.com/auth");
      return;
    }

    outsetaRef.current?.auth?.open({
      widgetMode: "login|register",
      authenticationCallbackUrl: window.location.href,
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
        outsetaToken,
        xanoToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
