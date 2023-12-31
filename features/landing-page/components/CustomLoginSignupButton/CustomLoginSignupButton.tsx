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
        if (isHomepage) {
          openLoginSignup();
        } else {
          router.push("/?openLoginSignup=true");
        }
      }}
    >
      Login / Register
    </Button>
  );
}
