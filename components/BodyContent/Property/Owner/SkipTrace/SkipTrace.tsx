import React, { useState } from "react";
import styles from "../Owner.module.scss";
import { Box, CircularProgress, Dialog } from "@mui/material";
import { SkipTraceResponse } from "pages/api/core/reapi/skipTrace";
import { IGetOwnerInformationProps, getOwnerInformation } from "../getOwnerInformation";
import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { atom, useRecoilState } from "recoil";
import { Button } from "components/Button/Button";
import Close from "public/icons/close.svg";

const contactInfo = atom({
  key: "contactInfo",
  default: {} as SkipTraceResponse,
});
const savedContacts = atom({
  key: "savedContactsInfo",
  default: [] as SkipTraceResponse[],
});

const showAgainState = atom({
  key: "showAgain",
  default: false,
});

interface ISkipTrace {
  ownerInformation: IGetOwnerInformationProps;
}

export default function SkipTrace({ ownerInformation }: ISkipTrace) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isContactInfoOpened, setContactInfoOpened] = useState<boolean>(false);
  const [, setContactInfo] = useRecoilState(contactInfo);

  const [isWarningModalOpened, setWarningInfoModalOpened] = useState<boolean>(false);
  const [savedContactsState] = usePersistentRecoilState<SkipTraceResponse[]>("savedContacts", savedContacts);
  const [showAgain] = useRecoilState(showAgainState);

  const handleGetInfoClick = async () => {
    const prepareOwnerInformation = async () => {
      const { data } = await getOwnerInformation(ownerInformation);
      setContactInfo(data);
    };
    try {
      setLoading(true);
      await prepareOwnerInformation();
      setWarningInfoModalOpened(false);
      setContactInfoOpened(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const savedContact = savedContactsState.find((savedContact: SkipTraceResponse) => {
    const savedContactNames = savedContact.output.identity.names[0];
    return `${ownerInformation.firstName}${ownerInformation.lastName}` === `${savedContactNames.firstName}${savedContactNames.lastName}`;
  });

  const isContactSaved = Boolean(savedContact);

  const handleContactInfo = async () => {
    if (isContactSaved && savedContact) {
      setContactInfo(savedContact);
      setContactInfoOpened(true);
      return;
    }
    if (!showAgain) {
      setWarningInfoModalOpened(true);
    } else {
      await handleGetInfoClick();
    }
  };

  const buttonText = isContactSaved ? "See saved contact" : "Get contact info";

  return (
    <>
      <SkipTracingInfoNoteModal isInfoNoteOpen={isWarningModalOpened} setIsInfoNoteOpen={setWarningInfoModalOpened} handleGetInfoClick={handleGetInfoClick} />
      <ContactInfoModal isContactModalOpened={isContactInfoOpened} setContactModalOpen={setContactInfoOpened} ownerInformation={ownerInformation} />
      <Button variant={isContactSaved ? "outlined" : "filled"} className={styles.getInfoButton} onClick={handleContactInfo}>
        {isLoading ? <CircularProgress sx={{ color: "white" }} size={12} /> : buttonText}
      </Button>
    </>
  );
}

function SkipTracingInfoNoteModal({
  isInfoNoteOpen,
  setIsInfoNoteOpen,
  handleGetInfoClick,
}: {
  isInfoNoteOpen: boolean;
  setIsInfoNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetInfoClick: () => Promise<void>;
}) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showAgain, setShowAgain] = useRecoilState(showAgainState);

  const handleCheckboxChange = () => {
    setShowAgain(!showAgain);
  };

  const handleCancelClick = () => {
    setIsInfoNoteOpen(false);
    setLoading(false);
  };

  return (
    <Dialog open={isInfoNoteOpen} sx={{ paddingTop: 30, borderRadius: 30 }}>
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
          <input type="checkbox" checked={showAgain} onChange={handleCheckboxChange} />
          <span>Don't show this message again.</span>
        </div>
        <div className={styles.buttonFooter}>
          <Button className={styles.button} onClick={handleCancelClick} variant="outlined">
            Cancel
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              handleGetInfoClick();
            }}
          >
            {isLoading ? <CircularProgress sx={{ color: "#00a13d" }} size={12} /> : "Get info"}
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}

function ContactInfoModal({
  isContactModalOpened,
  setContactModalOpen,
  ownerInformation,
}: {
  isContactModalOpened: boolean;
  setContactModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ownerInformation: IGetOwnerInformationProps;
}) {
  const [isLoading] = useState<boolean>(false);
  // Skip Tracing: Dialog information:
  const [contactInfoState] = useRecoilState(contactInfo);
  const [savedContactsState, setSavedContactsState] = usePersistentRecoilState<SkipTraceResponse[]>("savedContacts", savedContacts);

  const handleClose = () => {
    setContactModalOpen(false);
  };

  const savedContact = savedContactsState.find((savedContact: SkipTraceResponse) => {
    const savedContactNames = savedContact.output.identity.names[0];
    return `${ownerInformation.firstName}${ownerInformation.lastName}` === `${savedContactNames.firstName}${savedContactNames.lastName}`;
  });

  const isContactSaved = Boolean(savedContact);

  const handleSaveContactInfo = async (contactInfo: SkipTraceResponse) => {
    if (!isContactSaved) {
      setSavedContactsState([...(savedContactsState || [{}]), contactInfo]);
    }
  };
  const getListOrder = (index: number) => (index === 0 ? "" : index);

  const buttonText = isContactSaved ? "Saved" : "Save contact info";
  return (
    <Dialog open={isContactModalOpened} sx={{ paddingTop: 30, borderRadius: 30 }}>
      <Box className={styles.skipTracingModal}>
        <div className={styles.header}>
          <h3>Owner's contact information</h3>
          <Close style={{ cursor: "pointer" }} onClick={handleClose} />
        </div>
        <hr style={{ opacity: 0.2 }} />
        {contactInfoState?.output && (
          <div className={styles.modalBody}>
            {contactInfoState.output?.identity.emails?.map(({ email }, index) => (
              <div key={email} className={styles.accordionHeader}>
                <small>Email {getListOrder(index)}</small>
                <input disabled={true} className={styles.contactInput} value={email} />
              </div>
            ))}
            {contactInfoState.output?.identity.phones?.map(({ phone, phoneDisplay }, index) => (
              <div key={phone} className={styles.accordionHeader}>
                <small>Phone No. {getListOrder(index)}</small>
                <input disabled={true} className={styles.contactInput} value={phoneDisplay} />
              </div>
            ))}
          </div>
        )}
        <div className={styles.saveContactButton}>
          <Button disabled={isContactSaved} variant={isContactSaved ? "outlined" : "filled"} onClick={() => handleSaveContactInfo(contactInfoState)} className={styles.button}>
            {isLoading ? <CircularProgress sx={{ color: "#00a13d" }} size={12} /> : buttonText}
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}
