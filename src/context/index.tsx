import { AuthProvider } from "@context/module/authContext";
import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
