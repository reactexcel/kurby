import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import OwnerSvg from "../../../../public/icons/owner.svg";
import LocationSvg from "../../../../public/icons/location.svg";
import styles from "./Owner.module.scss";
import { Button } from "components/Button/Button";
import { atom, useRecoilState } from "recoil";
import Close from "../../../../public/icons/close.svg";

interface OwnerProps {
  owner: {
    firstName: string;
    lastName: string;
    address: string;
  };
}

const textState = atom({
  key: "textState",
  default: false,
});

export default function Owner({ owner }: OwnerProps) {
  const [, setOpened] = useRecoilState(textState);

  if (!owner) {
    return null;
  }

  const handleContactInfo = () => {
    setOpened(true);
  };
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.icon}>
        <OwnerSvg />
      </Box>
      <Box className={styles.info}>
        <SkipTracingModal />
        <Typography variant="h5" component="h5" fontSize={"20px"}>
          {owner.firstName} {owner.lastName}
        </Typography>
        <div className={styles.address}>
          <LocationSvg style={{ minWidth: "17px" }} />
          <p className={styles.ownerAddress}>{owner.address}</p>
        </div>
        <div className={styles.getInfo}>
          <Button onClick={handleContactInfo}>Get contact info</Button>
        </div>
      </Box>
    </Box>
  );
}

function SkipTracingModal() {
  const [isOpened, setOpened] = useRecoilState(textState);
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  const handleCancelClick = () => {
    setOpened(false);
  };

  const handleGetInfoClick = () => {
    // Logic to proceed with the action
  };

  return (
    <Dialog open={isOpened} sx={{ paddingTop: 30, borderRadius: 30 }}>
      <Box className={styles.skipTracingModal}>
        <div className={styles.header}>
          <h3>Skip Tracing</h3>
          <Close style={{ cursor: "pointer" }} onClick={handleCancelClick} />
        </div>
        <p className={styles.skipTracingDescription}>
          Please note that using the skip tracing feature will incur an additional charge of $0.12 per use, which will be added to your monthly subscription and billed
          immediately. By proceeding, you acknowledge and accept this charge.
        </p>

        <div onClick={handleCheckboxChange} className={styles.checkboxWrapper}>
          <input type="checkbox" checked={isChecked} />
          <span>Don't show this message again.</span>
        </div>
        <div className={styles.buttonFooter}>
          <Button className={styles.button} onClick={handleCancelClick} variant="outlined">
            Cancel
          </Button>
          <Button className={styles.button}>Get info</Button>
        </div>
      </Box>
    </Dialog>
  );
}
