import { useEffect, useRef } from "react";

const useDocumentTitle = (title: string, isKeep = false) => {
  // useRef 的值在整个生命周期内都不会发生改变
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!isKeep) {
        document.title = oldTitle;
      }
    };
  }, [isKeep, oldTitle]);
};

export default useDocumentTitle;

// const test = () => {
//   let num = 0;
//
//   const effect = () => {
//     num += 1;
//     const message = `current num: ${num}`;
//
//     // 这里总是返回一个新的函数
//     return function unmount() {
//       console.log(message);
//     };
//   };
//
//   return effect;
// };
//
// // 返回 effect 函数
// const add = test();
//
// // 返回引用了 message1 的 unmount 函数
// const unmount = add();
// // 再一次执行 effect 函数，返回引用了 message2 的 unmount 函数
// const unmount1 = add();
// unmount1(); // current num: 2
// // 再一次执行 effect 函数，返回引用了 message3 的 unmount 函数
// add();
// // 再一次执行 effect 函数，返回引用了 message4 的 unmount 函数
// add();
//
// unmount(); // current num: 1
