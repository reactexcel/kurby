import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import OwnerSvg from "../../../../public/icons/owner.svg";
import LocationSvg from "../../../../public/icons/location.svg";
import styles from "./Owner.module.scss";
import { Button } from "components/Button/Button";
import { atom, useRecoilState } from "recoil";

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
  const [isChecked, setIsChecked] = useRecoilState(textState);

  if (!owner) {
    return null;
  }

  const handleContactInfo = () => {
    setIsChecked(true);
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
  const [isChecked, setIsChecked] = useRecoilState(textState);
  const handleCheckboxChange = () => {};

  const handleCancelClick = () => {
    // Logic to close the modal
  };

  const handleGetInfoClick = () => {
    // Logic to proceed with the action
  };

  return (
    <div style={{ padding: "20px", border: "1px solid black", borderRadius: "8px", width: "300px", backgroundColor: "white" }}>
      <h3>Skip Tracing</h3>
      <p>
        Please note that using the skip tracing feature will incur an additional charge of $0.12 per use, which will be added to your monthly subscription and billed
        immediately. By proceeding, you acknowledge and accept this charge.
      </p>
      <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        <span style={{ marginLeft: "10px" }}>Don't show this message again.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={{ border: "1px solid black", padding: "5px 10px", borderRadius: "5px" }} onClick={handleCancelClick}>
          Cancel
        </button>
        <button style={{ backgroundColor: "#007BFF", color: "white", padding: "5px 10px", borderRadius: "5px" }} onClick={handleGetInfoClick}>
          Get info
        </button>
      </div>
    </div>
  );
}
