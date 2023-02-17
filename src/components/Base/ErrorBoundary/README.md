# 错误边界处理组件

## 注意点

1. 只能使用 `class` 组件
2. 静态方法 `getDerivedStateFromError` 当遇到全局错误的时候可以捕获到，并且会执行该方法，并且把当前组件的 `state` 的值改为 `error`

## 组件属性

| 字段           | 类型            | 描述               |
| -------------- | --------------- | ------------------ |
| fallbackRender | FallbackRender  | 错误处理函数       |
| children       | React.ReactNode | 没有错误显示的内容 |

FallbackRender

```javascript
type FallbackRender = (props: { error: Error | null }) => void;
```

## Demo

```typescript
const FullScreenErrorCallback = ({ error }: { error: Error | null }) => {
  return <div>Error content</div>;
};

const testRender = () => {
  return (
    <div>
      <ErrorBoundary fallbackRender={FullScreenErrorCallback}>
        Correct content
      </ErrorBoundary>
    </div>
  );
};
```
