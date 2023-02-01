import useArray from "@hooks/useArray";

export interface IPerson {
  name: string;
  age: number;
}

const persons: IPerson[] = [
  { name: "001", age: 18 },
  { name: "002", age: 19 },
  { name: "003", age: 20 },
];

const Demo = () => {
  const { val, add, removeIndex, clear } = useArray<IPerson>(persons);

  return (
    <div>
      <ul>
        {val.map((item, index) => {
          return (
            <li key={index}>
              {item.name},{item.age + index}
            </li>
          );
        })}
      </ul>
      <button onClick={() => clear()}>clear</button>
      <button onClick={() => add({ name: "newName", age: 200 })}>add</button>
      <button onClick={() => removeIndex(0)}>removeIndex000</button>
    </div>
  );
};

export default Demo;
