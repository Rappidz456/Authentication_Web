"use client";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import React from "react";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = React.useRef<AppStore>(makeStore());
  !storeRef.current ? (storeRef.current = makeStore()) : null;
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
