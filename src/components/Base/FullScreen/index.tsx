import React, { PropsWithChildren } from "react";

const FullScreen: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export default FullScreen;
