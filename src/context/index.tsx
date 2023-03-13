import { store } from "@/store";
import { AuthProvider } from "@context/module/authContext";
import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
