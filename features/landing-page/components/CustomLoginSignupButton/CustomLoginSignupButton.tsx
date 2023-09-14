import { useAuth } from "providers/AuthProvider";
import { Button } from "components/Button/Button";
import { useRouter } from "next/router";
import styles from "./CustomLoginSignupButton.module.scss";

export default function CustomLoginSignUpButton() {
  const { user, isLoading, openLoginSignup } = useAuth();
  const router = useRouter();

  const isHomepage = router.pathname === "/";

  if (user && isLoading) {
    return null;
  }

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
