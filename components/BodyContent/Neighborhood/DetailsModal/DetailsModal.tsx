import { Dialog } from "@mui/material";
import { useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import styles from "./DetailsModal.module.scss";

interface DetailsModalProps {
  children: JSX.Element | JSX.Element[];
  card: React.ReactNode;
}

export const DetailsModal = ({ children, card }: DetailsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.card}>
        {card}
        <LaunchIcon className={styles.launchIcon} onClick={() => setOpen(true)} />
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            padding: "25px",
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <div className={styles.modalCard}>{card}</div>
        <div className={styles.children}>{children}</div>
      </Dialog>
    </>
  );
};
