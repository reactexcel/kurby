import { Box, CircularProgress, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import OwnerSvg from "../../../../public/icons/owner.svg";
import LocationSvg from "../../../../public/icons/location.svg";
import styles from "./Owner.module.scss";
import { Button } from "components/Button/Button";
import { atom, useRecoilState } from "recoil";
import Close from "../../../../public/icons/close.svg";
import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { IGetOwnerInformationProps, getOwnerInformation } from "./getOwnerInformation";
import { SkipTraceResponse } from "pages/api/core/reapi/skipTrace";

const skipTraceShowAgainState = {
  key: "skipTraceShowAgain",
  default: false,
};

export const skipTraceShowAgain = atom(skipTraceShowAgainState);
interface OwnerProps {
  owner: {
    firstName: string;
    lastName: string;
    address: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

const textState = atom({
  key: "textState",
  default: false,
});

const contactInfoState = atom({
  key: "textScontactInfoState",
  default: false,
});

const contactInfoResponse = atom({
  key: "contactInfoResponse",
  default: {} as SkipTraceResponse,
});

const savedContacts = atom({
  key: "savedContactsInfo",
  default: [] as SkipTraceResponse[],
});

export default function Owner({ owner, address }: OwnerProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setWarningOpened] = useRecoilState(textState);
  const [, setOpened] = useRecoilState(contactInfoState);
  const [showAgain] = usePersistentRecoilState("skipTraceShowAgain", skipTraceShowAgain);
  const [savedContactsState] = usePersistentRecoilState<SkipTraceResponse[]>("savedContacts", savedContacts);
  const [contactInfo, setContactInfo] = usePersistentRecoilState("contactInfo", contactInfoResponse);

  const ownerInformationProps: IGetOwnerInformationProps = {
    firstName: owner.firstName,
    lastName: owner.lastName,
    address: address.address,
    zip: address.zip,
    city: address.city,
    state: address.state,
  };

  if (!owner) {
    return null;
  }
  const handleGetInfoClick = async () => {
    const prepareOwnerInformation = async () => {
      const { data } = await getOwnerInformation(ownerInformationProps);
      setContactInfo(data);
    };
    try {
      setLoading(true);
      await prepareOwnerInformation();
      setOpened(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const savedContact = savedContactsState.find(
    (savedContact) => savedContact.output.identity.address.formattedAddress === contactInfo.output.identity.address.formattedAddress,
  );
  const isContactSaved = Boolean(savedContact);

  const handleContactInfo = async () => {
    if (isContactSaved && savedContact) {
      setContactInfo(savedContact);
      setOpened(true);
      return;
    }

    if (!showAgain) {
      setWarningOpened(true);
    } else {
      await handleGetInfoClick();
    }
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.icon}>
        <OwnerSvg />
      </Box>
      <Box className={styles.info}>
        {(!showAgain || !savedContact) && <SkipTracingModal props={ownerInformationProps} />}
        <ContactInfoModal />
        <Typography variant="h5" component="h5" fontSize={"20px"}>
          {owner.firstName} {owner.lastName}
        </Typography>
        <div className={styles.address}>
          <LocationSvg style={{ minWidth: "17px" }} />
          <p className={styles.ownerAddress}>{owner.address}</p>
        </div>
        <div className={styles.getInfo}>
          <Button className={styles.getInfoButton} onClick={handleContactInfo}>
            {isLoading ? <CircularProgress sx={{ color: "#00a13d" }} size={12} /> : "Get contact info"}
          </Button>
        </div>
      </Box>
    </Box>
  );
}

function SkipTracingModal({ props }: { props: IGetOwnerInformationProps }) {
  const [, setContactInfo] = usePersistentRecoilState("contactInfo", contactInfoResponse);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpened, setOpened] = useRecoilState(textState);
  const [, setContactModalOpened] = useRecoilState(contactInfoState);
  const [showAgain, setChecked] = usePersistentRecoilState("skipTraceShowAgain", skipTraceShowAgain);

  const handleCheckboxChange = () => {
    setChecked(!showAgain);
  };

  const handleCancelClick = () => {
    setOpened(false);
    setLoading(false);
  };

  const handleGetInfoClick = async () => {
    const prepareOwnerInformation = async () => {
      const { data } = await getOwnerInformation(props);
      setContactInfo(data);
    };
    try {
      setLoading(true);
      await prepareOwnerInformation();
      setOpened(false);
      setContactModalOpened(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
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
          <input type="checkbox" checked={showAgain} />
          <span>Don't show this message again.</span>
        </div>
        <div className={styles.buttonFooter}>
          <Button className={styles.button} onClick={handleCancelClick} variant="outlined">
            Cancel
          </Button>
          <Button className={styles.button} onClick={handleGetInfoClick}>
            {isLoading ? <CircularProgress sx={{ color: "#00a13d" }} size={12} /> : "Get info"}
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}

function ContactInfoModal() {
  const [savedContactsState, setSavedContactsState] = usePersistentRecoilState<SkipTraceResponse[]>("savedContacts", savedContacts);
  const [contactInfo] = usePersistentRecoilState<SkipTraceResponse>("contactInfo", contactInfoResponse);
  const [isOpened, setOpened] = useRecoilState(contactInfoState);
  const [isLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpened(false);
  };

  const savedContact = savedContactsState.find(
    (savedContact) => savedContact.output.identity.address.formattedAddress === contactInfo.output.identity.address.formattedAddress,
  );

  const isContactSaved = Boolean(savedContact);

  const handleSaveContactInfo = async (contactInfo: SkipTraceResponse) => {
    if (!isContactSaved) {
      setSavedContactsState([...(savedContactsState || [{}]), contactInfo]);
    }
  };
  const getListOrder = (index: number) => (index === 0 ? "" : index);

  const buttonText = isContactSaved ? "Saved" : "Save contact info";
  return (
    <Dialog open={isOpened} sx={{ paddingTop: 30, borderRadius: 30 }}>
      <Box className={styles.skipTracingModal}>
        <div className={styles.header}>
          <h3>Owner's contact information</h3>
          <Close style={{ cursor: "pointer" }} onClick={handleClose} />
        </div>
        <hr style={{ opacity: 0.2 }} />
        {contactInfo?.output && (
          <div className={styles.modalBody}>
            {contactInfo.output?.identity.emails?.map(({ email }, index) => (
              <div key={email} className={styles.accordionHeader}>
                <small>Email {getListOrder(index)}</small>
                <input disabled={true} className={styles.contactInput} value={email} />
              </div>
            ))}
            {contactInfo.output?.identity.phones?.map(({ phone, phoneDisplay }, index) => (
              <div key={phone} className={styles.accordionHeader}>
                <small>Phone No. {getListOrder(index)}</small>
                <input disabled={true} className={styles.contactInput} value={phoneDisplay} />
              </div>
            ))}
          </div>
        )}
        <div className={styles.saveContactButton}>
          <Button disabled={isContactSaved} variant={isContactSaved ? "outlined" : "filled"} onClick={() => handleSaveContactInfo(contactInfo)} className={styles.button}>
            {isLoading ? <CircularProgress sx={{ color: "#00a13d" }} size={12} /> : buttonText}
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}
