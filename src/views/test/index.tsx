import React from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { URLSearchParams } from "url";
import qs from "qs";

const Test = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  // const url = new URLSearchParams();

  // console.log(url);
  console.log(params);
  console.log(qs.parse(searchParams.toString()));
  return <div>Test</div>;
};

export default Test;
