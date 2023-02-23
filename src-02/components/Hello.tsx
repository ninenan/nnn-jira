import React, { PropsWithChildren } from "react";

interface IProps {
  message: string;
}

// 不建议使用这种，使用 React.FC（React.FunctionComponent 的缩写）,可以获取到组件的定义好的属性
// const Hello = (props: IProps) => {
//   const { message } = props;
//   return <div>{message}</div>;
// };

const Hello: React.FC<PropsWithChildren<IProps>> = (props) => {
  const { message } = props;

  return <div>{message}</div>;
};

Hello.defaultProps = {
  message: "Hello wrold",
};

export default Hello;
