import { useState } from "react";
import { Button, Card, Divider } from "antd";

import leftImg from "@assets/img/left.svg";
import logoImg from "@assets/img/logo.svg";
import rightImg from "@assets/img/right.svg";
import Login from "@components/Login";
import Register from "@components/Register";

import styles from "./index.module.scss";

const UnAuthenticated = () => {
  const [isLogin, setIsLogin] = useState(true);
  const btnText = isLogin ? "未有帐号，前往注册" : "已有帐号，直接登录";

  return (
    <div className={styles.container}>
      <div
        className={styles["background-container"]}
        style={{
          backgroundImage: `url(${leftImg}), url(${rightImg})`,
        }}
      ></div>
      <div
        className={styles.header}
        style={{ background: `url(${logoImg}) no-repeat center/8rem` }}
      ></div>
      <Card className={styles["shadow-card"]}>
        <h2 className={styles.title}>{isLogin ? "请登录" : "请注册"}</h2>
        {isLogin ? <Login /> : <Register />}
        <Divider />
        <footer className={styles.footer}>
          <Button type="link" onClick={() => setIsLogin(!isLogin)}>
            {btnText}
          </Button>
        </footer>
      </Card>
    </div>
  );
};

export default UnAuthenticated;
