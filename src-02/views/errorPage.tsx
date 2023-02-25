import { ErrorRespone } from "@/typings";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  // useRouteError 可以获取到路由错误时捕获到的错误
  const error = useRouteError() as ErrorRespone;
  console.log(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
