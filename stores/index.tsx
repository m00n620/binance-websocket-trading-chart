import React, { ReactNode, useState } from "react";
import { RootStore } from "./root";

const storeContext = React.createContext<RootStore | null>(null);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rootStore] = useState(() => new RootStore());

  return (
    <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error("You have forgot to use StoreProvider");
  }
  return store;
};
