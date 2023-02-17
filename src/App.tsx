import useAuth from "@hooks/useAuth";
import ErrorBoundary from "@components/Base/ErrorBoundary";
import FullScreenErrorCallback from "@components/Base/FullScreenErrorFallback";
import "antd/dist/reset.css";
import "./App.css";
import Authenticated from "./views/authenticated";
import UnAuthenticated from "./views/unAuthenticated";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullScreenErrorCallback}>
        {user ? <Authenticated /> : <UnAuthenticated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
