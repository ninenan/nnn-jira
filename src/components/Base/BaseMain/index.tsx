import { FC, PropsWithChildren } from "react";
import styles from "./index.module.scss";

const BaseMain: FC<PropsWithChildren<any>> = ({ children }) => {
  return <div className={styles.baseMainContainer}> {children}</div>;
};

export default BaseMain;
