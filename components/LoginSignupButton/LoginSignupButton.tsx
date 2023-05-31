import { useAuth } from "providers/AuthProvider";
import { Button } from "components/Button/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const LoginSignupButton = () => {
  const { user, isLoading, openLoginSignup } = useAuth();
  const router = useRouter();

  const isHomepage = router.pathname === "/";

  useEffect(() => {
    if (!user && isHomepage && router.query.openLoginSignup) {
      openLoginSignup();
    }
  }, [user, router.pathname]);

  if (user && isLoading) {
    return null;
  }

  return (
    <Button
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
};
