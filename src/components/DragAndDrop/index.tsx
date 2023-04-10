import React, { ReactDOM } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

export type IDropProps = Omit<DroppableProps, "children"> & {
  children: ReactDOM;
};

export const Drop = ({ children, ...restProps }: IDropProps) => {
  return (
    <Droppable {...restProps}>
      {(provided: any) => {
        if (React.isValidElement(children)) {
          // 为每一个子组件都加上 { ...provided.droppableProps, ref: provided.innerRef, provided } 属性
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div></div>;
      }}
    </Droppable>
  );
};
