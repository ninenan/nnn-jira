import FullScreen from "../FullScreen";
import { DevTools } from "jira-dev-tool";

const FullScreenErrorCallback = ({ error }: { error: Error | null }) => {
  return (
    <FullScreen>
      {error?.message}
      <DevTools />
    </FullScreen>
  );
};

export default FullScreenErrorCallback;
