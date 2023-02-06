import { Input, Select, Form } from "antd";
import { CSSProperties, PropsWithChildren } from "react";
import { IUser } from "@/typings";

interface IProps {
  users: IUser[];
  styles?: CSSProperties;
}

const { Search } = Input;
const SearchCom: React.FC<PropsWithChildren<IProps>> = ({
  users,
  styles: style,
}) => {
  const handleOnSearch = (val: string) => {
    console.log(val);
  };

  const handleChange = (val: string) => {
    console.log(val);
  };

  return (
    <Form layout="inline" style={style}>
      <Form.Item>
        <Search
          allowClear
          placeholder="请输入项目名"
          onSearch={handleOnSearch}
          style={{ width: 200 }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          style={{ width: 120 }}
          onChange={handleChange}
          fieldNames={{
            label: "name",
            value: "name",
          }}
          options={users}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchCom;
