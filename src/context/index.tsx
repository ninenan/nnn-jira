import { AuthProvider } from "@context/module/authContext";
import React, { PropsWithChildren } from "react";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
