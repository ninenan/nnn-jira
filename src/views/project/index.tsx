import { Link, Outlet } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

const Project = () => {
  // const [searchParams] = useSearchParams();
  // console.log(searchParams);

  return (
    <div>
      <h1>Project</h1>
      <div>
        <Link to="">看板</Link>
        <Link to="epic">任务组</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Project;
