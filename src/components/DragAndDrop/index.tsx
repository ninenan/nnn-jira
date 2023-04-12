import React, { cloneElement, forwardRef, ReactDOM, ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

export type IDropProps = Omit<DroppableProps, "children"> & {
  children: ReactNode;
};

export const Drop = ({ children, ...restProps }: IDropProps) => {
  return (
    <Droppable {...restProps}>
      {(provided: any) => {
        // https://react.dev/reference/react/isValidElement 判断是否是 React element 元素
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

export type IDropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;

// https://react.dev/reference/react/forwardRef
// <DropChild ref={ref} />
export const DropChild = forwardRef<HTMLDivElement, IDropChildProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <div ref={ref} {...restProps}>
        {children}
        {restProps.provided?.placeholder}
      </div>
    );
  }
);

export type IDragProps = Omit<DraggableProps, "children"> & {
  children: ReactNode;
};

export const Drag = ({ children, ...restProps }: IDragProps) => {
  return (
    <Draggable {...restProps}>
      {(provided: any) => {
        if (React.isValidElement(children)) {
          return cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        } else {
          return <div></div>;
        }
      }}
    </Draggable>
  );
};
