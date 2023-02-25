import { useState, useEffect } from "react";

export default function useMousePositions() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({
        x: clientX,
        y: clientY,
      });
    };

    document.addEventListener("click", updatePosition);

    return () => {
      document.addEventListener("click", updatePosition);
    };
  }, []);

  return position;
}
