import { Button } from "antd";
import { useSearchParams, useParams } from "react-router-dom";
import useUndo from "@hooks/useUndo";
import qs from "qs";

const Test = () => {
  const [state, { set, reset, undo, redo, canUndo, canRedo }] =
    useUndo<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const url = new URLSearchParams();
  let { present, future, past } = state;

  console.log("present111: ", present);
  console.log(url);
  console.log(params);
  console.log(qs.parse(searchParams.toString()));

  return (
    <div>
      <div>future: {future}</div>
      <div>past: {past}</div>
      <div>一共点击了{present}次</div>
      <Button type="primary" onClick={() => set(present + 1)}>
        +
      </Button>{" "}
      <Button type="primary" onClick={() => set(present - 1)}>
        -
      </Button>{" "}
      <Button type="primary" disabled={!canUndo} onClick={undo}>
        undo
      </Button>{" "}
      <Button type="primary" disabled={!canRedo} onClick={redo}>
        redo
      </Button>{" "}
      <Button onClick={() => reset(0)}>rest to 0</Button>
    </div>
  );
};

export default Test;
