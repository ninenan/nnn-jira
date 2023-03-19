export const isVoid = (val: unknown) => {
  return val === undefined || val === null || val === 0 || val === "";
};

export const cleanObj = (obj: Record<string, unknown>) => {
  if (!obj) {
    return {};
  }

  const res = { ...obj };

  Object.entries(res).forEach(([key, val]) => {
    if (isVoid(val)) {
      delete res[key];
    }
  });

  return res;
};

// 不止会重置路由还会刷新整个页面
export const resetRoute = () => {
  return (window.location.href = window.location.origin);
};

export const subset = <O extends Record<string, unknown>, K extends keyof O>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );

  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
