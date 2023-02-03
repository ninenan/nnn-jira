import { Input, Select } from "antd";
import React, { PropsWithChildren } from "react";
import { IUser } from "@/typings";
import styles from "./index.module.scss";

interface IProps {
  users: IUser[];
}

const { Search } = Input;
const SearchCom: React.FC<PropsWithChildren<IProps>> = ({ users }) => {
  const handleOnSearch = (val: string) => {
    console.log(val);
  };

  const handleChange = (val: string) => {
    console.log(val);
  };

  return (
    <div className={styles.header}>
      success
      <Search
        allowClear
        placeholder="请输入"
        onSearch={handleOnSearch}
        style={{ width: 200 }}
      />
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        fieldNames={{
          label: "name",
          value: "name",
        }}
        options={users}
      />
    </div>
  );
};

export default SearchCom;
