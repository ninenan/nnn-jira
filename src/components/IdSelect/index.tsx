import { CSSProperties, FC } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

// 也可以通过这种方式来获取组件的类型
// type SelectProps = React.ComponentProps<typeof Select>;

interface IIdSelectProps
  extends Omit<SelectProps, "onChange" | "defaultValue" | "options"> {
  onChange?: (value?: number) => void;
  defaultValue?: number;
  options?: { name: string; id: number }[];
  style?: CSSProperties;
  defaultOptionName?: string;
}

const toNumber = (val: unknown) => (isNaN(Number(val)) ? 0 : Number(val));

const IdSelect: FC<IIdSelectProps> = (props) => {
  const { onChange, defaultValue, options, defaultOptionName, ...restProps } =
    props;
  return (
    <Select
      onChange={(val) => onChange?.(toNumber(val) || undefined)}
      fieldNames={{ label: "name", value: "id" }}
      options={options as DefaultOptionType[] | undefined}
      defaultValue={defaultValue}
      {...restProps}
    ></Select>
  );
};

export default IdSelect;
