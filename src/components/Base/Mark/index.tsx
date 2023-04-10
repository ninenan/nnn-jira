import { FC } from "react";

export interface IProps {
  name: string;
  keyword: string;
}

const Mark: FC<IProps> = ({ name, keyword }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const strArr = name.split(keyword);

  return (
    <>
      {strArr.map((str, index) => (
        <span key={index}>
          {str}
          {index === strArr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};

export default Mark;
