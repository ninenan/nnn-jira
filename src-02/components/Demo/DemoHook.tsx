import useMousePositions from "@hooks/useMousePositions";

export default function DemoHooks() {
  const position = useMousePositions();

  return (
    <div>
      hooks: x: {position.x}, y: {position.y}
    </div>
  );
}
