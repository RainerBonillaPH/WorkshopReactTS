import { useState } from "react";
import { Select, SelectOption } from "./components/Select";

const list = [
  { label: "pineapple", value: 1 },
  { label: "ham", value: 2 },
  { label: "pepperoni", value: 3 },
  { label: "anchovies", value: 4 },
];

function App() {
  //logica

  const [value, setValue] = useState<SelectOption | undefined>(list[0]);
  const [multiValue, setMultiValue] = useState<SelectOption[]>([list[0]]);

  function onChangeHandler(option: SelectOption | undefined) {
    setValue(option);
  }

  function onChangeMultiHandler(option: SelectOption[]) {
    setMultiValue(option);
  }

  /*
  const [value1, setValue1] = useState<Select1Option | undefined>(list[0]);

  function onChangeValue1(option: Select1Option | undefined) {
    setValue1(option);
  }
  */

  //retorna component (render)
  return (
    <>
      <Select selectOptions={list} value={value} onChange={onChangeHandler} />
      <br />
      <Select
        multi
        selectOptions={list}
        value={multiValue}
        onChange={onChangeMultiHandler}
      />
    </>
  );
}

export default App;
