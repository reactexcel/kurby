import { createContext, useMemo } from "react";

interface IsDevContext {
  isDev: boolean;
  // eslint-disable-next-line no-unused-vars
  message: (componentName?: string) => string;
}

const message = (componentName?: string) => {
  return `Some features are disabled because this is development environment to reduce costs, turn off isDev flag in the component to work on it. Component: ${componentName}`;
};

const initialValues = {
  isDev: false,
  message,
};

export const IsDevContext = createContext<IsDevContext>(initialValues);

export const IsDevProvider = ({ children }: { children: React.ReactNode }) => {
  const isDev = useMemo(() => process.env.NODE_ENV === "development", []);

  return <IsDevContext.Provider value={{ isDev, message: initialValues.message }}>{children}</IsDevContext.Provider>;
};
