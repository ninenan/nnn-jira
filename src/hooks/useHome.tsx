import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useHome = (isSuccess: Boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigate && isSuccess) {
      navigate({
        pathname: "/",
      });
    }
  }, [isSuccess, navigate]);
  // const toHome = (isSuccess: boolean) => {
  //   if (isSuccess) {
  //     navigate({
  //       pathname: "/",
  //     });
  //   }
  // };
  //
  // return {
  //   toHome,
  // };
};

export default useHome;
