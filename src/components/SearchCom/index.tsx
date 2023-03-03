import { Input, Select, Form } from "antd";
import { CSSProperties, PropsWithChildren } from "react";
import { IUser, IProject } from "@/typings";
import IdSelect from "@components/IdSelect";

export type ISearchParams = Partial<Pick<IProject, "name" | "personId">>;

interface IProps {
  users: IUser[];
  styles?: CSSProperties;
  searchParam: ISearchParams;
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
    onSearch({
      ...searchParam,
      name: val,
    });
  };

  const handleOnChange = (val: number | undefined) => {
    onSearch({
      ...searchParam,
      personId: val,
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
          defaultValue={searchParam.name}
        />
      </Form.Item>
      <Form.Item>
        {/* <Select
          style={{ width: 120 }}
          onChange={handleOnChange}
          fieldNames={{
            label: "name",
            value: "id",
          }}
          options={users}
          defaultValue={+searchParam.personId!}
        /> */}
        <IdSelect
          defaultOptionName="负责人"
          style={{ width: 120 }}
          onChange={handleOnChange}
          options={users}
          placeholder="负责人"
        />
      </Form.Item>
    </Form>
  );
};

export default SearchCom;
