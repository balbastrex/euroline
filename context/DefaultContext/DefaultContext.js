import { createContext } from "react";

export const DefaultContext = createContext();

const DefaultProvider = ({ children }) => {
  return (
    <DefaultContext.Provider value={{}}>{children}</DefaultContext.Provider>
  );
};

export default DefaultProvider;
