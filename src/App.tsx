import React from "react";
import { useAuth } from "./context/module/authContext";
import Authenticated from "./views/authenticated";
import UnAuthenticated from "./views/unAuthenticated";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">{user ? <Authenticated /> : <UnAuthenticated />}</div>
  );
}

export default App;
