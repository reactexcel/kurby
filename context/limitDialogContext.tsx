import { createContext, useState } from "react";

interface DialogContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  isOpen: false,
  setIsOpen: () => {},
};

export const DialogContext = createContext<DialogContext>(initialValues);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <DialogContext.Provider value={{ isOpen, setIsOpen }}>{children}</DialogContext.Provider>;
};
