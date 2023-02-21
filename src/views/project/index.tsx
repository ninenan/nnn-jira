import React from "react";
import { useSearchParams } from "react-router-dom";

const Project = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  return <div>Project</div>;
};

export default Project;
