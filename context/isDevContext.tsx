import { createContext, useMemo } from "react";

interface IsDevContext {
  isDev: boolean;
  // eslint-disable-next-line no-unused-vars
  message: (componentName?: string) => string;
}

const message = (componentName?: string) => {
  return `To reduce costs, some features are disabled because this is development environment, turn off isDev flag in the component to work on it. Component: ${componentName}`;
};

const initialValues = {
  isDev: false,
  message,
};

export const IsDevContext = createContext<IsDevContext>(initialValues);

export const IsDevProvider = ({ children }: { children: React.ReactNode }) => {
  // const isDev = useMemo(() => window.location.hostname === "localhost", []);
  const isDev = useMemo(() => true, []);

  return <IsDevContext.Provider value={{ isDev, message: initialValues.message }}>{children}</IsDevContext.Provider>;
};
