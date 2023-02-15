import { Input, Select, Form } from "antd";
import { CSSProperties, PropsWithChildren } from "react";
import { IUser } from "@/typings";

interface IProps {
  users: IUser[];
  styles?: CSSProperties;
  searchParam: {
    name?: string;
    personId?: number;
  };
  onSearch: (param: IProps["searchParam"]) => void;
}

const { Search } = Input;
const SearchCom: React.FC<PropsWithChildren<IProps>> = ({
  users,
  styles: style,
  onSearch,
  searchParam,
}) => {
  const handleOnSearch = (val: string) => {
    console.log(val);
  };

  const handleChange = (val: string) => {
    const personId = users.find((user) => user.name === val)?.id;
    console.log(users);
    onSearch({
      ...searchParam,
      personId,
    });
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
