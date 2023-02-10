import useAuth from "@hooks/useAuth";
import Authenticated from "./views/authenticated";
import UnAuthenticated from "./views/unAuthenticated";
import "antd/dist/reset.css";
import "./App.css";
// import { message } from "antd";

function App() {
  const { user } = useAuth();
  // const [contextHolder] = message.useMessage();

  return (
    <div className="App">{user ? <Authenticated /> : <UnAuthenticated />}</div>
  );
}

export default App;
