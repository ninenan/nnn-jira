import useAuth from "@hooks/useAuth";
import Authenticated from "./views/authenticated";
import UnAuthenticated from "./views/unAuthenticated";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">{user ? <Authenticated /> : <UnAuthenticated />}</div>
  );
}

export default App;
