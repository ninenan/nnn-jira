import React, { FC, PropsWithChildren } from "react";
import { Rate } from "antd";

interface IProps extends React.ComponentProps<typeof Rate> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Pin: FC<PropsWithChildren<IProps>> = ({
  checked,
  onCheckedChange,
  ...restProps
}) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    ></Rate>
  );
};

export default Pin;
