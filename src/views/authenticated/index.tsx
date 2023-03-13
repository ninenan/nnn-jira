import { Outlet } from "react-router-dom";
import ProjectModal from "@components/ProjectModal";
import Header from "./components/Header";

const Authenticated = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ProjectModal />
    </>
  );
};

export default Authenticated;
