## 无限渲染问题

1. **当依赖于非基本类型的值，基本都会包裹一层 useCallback 或者 useMemo，限制住页面渲染的时候重新创建**
2. 当自定义 hook 返回出去函数的时候，基本都是要加上 useCallback（概率很大）
3. 当别的组件依赖于当前这个组件导出的函数时，如果不加上 useCallback，页面的每次渲染都会导致重新创建函数，从而导致无限渲染

```typescript
export const useTest = () => {
  const setData = useCallback(
    (data: T) =>
      setState({
        data,
        status: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) => setState({ status: "fail", error, data: null }),
    []
  );

  return {
    setData,
    setError,
  };
};
```

### useCallback 中使用 useState 怎么处理

可以使用函数式的方式来设置

```typescript
setState((prev) => ({ ...prev, status: "pending" }));
```
