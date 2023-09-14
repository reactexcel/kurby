import { useAuth } from "providers/AuthProvider";
import { Button } from "components/Button/Button";
import { useRouter } from "next/router";
import styles from "./CustomLoginSignupButton.module.scss";
import { useRecoilState } from "recoil";
import { createContext, useEffect, useState } from "react";
import { useOutseta } from "hooks/use-outseta";

export default function CustomLoginSignUpButton() {
  const { user, isLoading, openLoginSignup } = useAuth();

  const router = useRouter();

  const isHomepage = router.pathname === "/";

  const outsetaRef = useOutseta();

  if (user && isLoading) {
    return null;
  }

  // useEffect(() => {
  //   setPreviousURL(router.asPath);
  // }, [router.asPath]);

  return (
    <Button
      className={styles.main}
      onClick={() => {
        // redirects to the page with authentication
        outsetaRef.current?.auth?.open({
          widgetMode: "login|register",
          authenticationCallbackUrl: window.location.href,
        });

        // if (isHomepage) {
        //   // redirects to the page with authentication
        //   router.push("https://kurby.outseta.com/auth");
        // } else {
        //   router.push("/?openLoginSignup=true");
        // }
      }}
    >
      Login / Register
    </Button>
  );
}
