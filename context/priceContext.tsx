import React, { createContext, useContext, useState } from "react";

type MyContextType = {
  param: boolean;
  setParam: (newValue: boolean) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

type MyContextProviderProps = {
  children: React.ReactNode;
  initialParam: boolean;
};

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children, initialParam }) => {
  const [param, setParam] = useState<boolean>(initialParam);
  const setParamValue = (newValue: boolean) => {
    setParam(newValue);
  };
  const contextValue: MyContextType = { param, setParam: setParamValue };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};
