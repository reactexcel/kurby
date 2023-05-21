import Dialog from "@mui/material/Dialog";
import styles from "./SuccessSignupDialog.module.scss";
import { useRouter } from "next/router";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Button } from "components/Button/Button";

export const SuccessSignupDialog = () => {
  const router = useRouter();

  const handleClose = () => router.push("/");

  return (
    <Dialog open className={styles.dialog} onClose={() => handleClose()}>
      <div className={styles.content}>
        <h2>Almost done</h2>
        <div>
          <CheckCircle className={styles.icon} />
        </div>
        <div className={styles.text}>Check your inbox, we have sent you an email.</div>
        <div className={styles.text}>Please click the link inside to complete the registration proccess.</div>
        <Button onClick={() => handleClose()} className={styles.button}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};
