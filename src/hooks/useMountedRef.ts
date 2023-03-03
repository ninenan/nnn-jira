import { useEffect, useRef } from "react";

/**
 * 返回组件的挂载状态，卸载或者未挂载返回 false，否则返回 true
 *
 * @returns {mountedRef: boolean} 组件挂载状态
 */
const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return {
    mountedRef,
  };
};

export default useMountedRef;
