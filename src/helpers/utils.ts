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
