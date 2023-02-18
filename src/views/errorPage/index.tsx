import FullScreen from "@components/Base/FullScreen";
import styles from "./indes.module.scss";

const ErrorPage = () => {
  return (
    <FullScreen>
      <div className={styles.errorPage}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>errorPage</p>
      </div>
    </FullScreen>
  );
};

export default ErrorPage;
