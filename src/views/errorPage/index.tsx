import FullScreen from "@components/Base/FullScreen";
import { useRouteError } from "react-router";
import styles from "./indes.module.scss";

const ErrorPage = () => {
  // useRouteError 可以捕获到当前页面的错误信息
  const routerError = useRouteError() as Error;

  return (
    <FullScreen>
      <div className={styles.errorPage}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>error message: {routerError.message}</p>
        <p>errorPage</p>
      </div>
    </FullScreen>
  );
};

export default ErrorPage;
