import React, { useEffect, useState } from "react";

interface IPosition {
  x: number;
  y: number;
}

/**
 * 执行顺序 首次
 * before render -> add effect -> remove effect -> add effect
 * 点击之后的执行顺序 未添加依赖
 * inner -> before render -> remove render -> add effect
 * 点击之后的执行顺序 添加了 counter 依赖
 * before render -> remove effect -> add effect -> innter -> before render
 */
const MousePosition = () => {
  const [position, setPosition] = useState<IPosition>({
    x: 0,
    y: 0,
  });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("add effect: ", position.x);
    const updatePosition = (e: MouseEvent) => {
      console.log("inner");
      const { clientX, clientY } = e;
      setPosition({
        x: clientX,
        y: clientY,
      });
    };

    document.addEventListener("click", updatePosition);

    return () => {
      console.log("remove effect: ", position.x);
      document.removeEventListener("click", updatePosition);
    };
  }, [counter]);

  console.log("before render: ", position.x);

  return (
    <div>
      x: {position.x}, y: {position.y}
      <div>
        <button onClick={() => setCounter(counter + 1)}>
          counter++{counter}
        </button>
      </div>
    </div>
  );
};

export default MousePosition;
