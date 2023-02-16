import React, { PropsWithChildren } from "react";
import FullScreen from "../FullScreen";
import { DevTools } from "jira-dev-tool";

const FullScreenErrorFallback: React.FC<
  PropsWithChildren<{ error: Error | null }>
> = ({ error }) => {
  return (
    <FullScreen>
      {error?.message}
      <DevTools />
    </FullScreen>
  );
};

export default FullScreenErrorFallback;
