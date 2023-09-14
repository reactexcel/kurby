import { useAuth } from "providers/AuthProvider";
import { Button } from "components/Button/Button";
import { useRouter } from "next/router";
import styles from "./CustomLoginSignupButton.module.scss";
import { useRecoilState } from "recoil";
import { createContext, useEffect, useState } from "react";

export default function CustomLoginSignUpButton() {
  const { user, isLoading, openLoginSignup } = useAuth();

  const router = useRouter();

  const isHomepage = router.pathname === "/";

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
        // setCurrentRoute(window.location.pathname);
        // redirects to the page with authentication
        router.push("https://kurby.outseta.com/auth");

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
