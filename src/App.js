import { useEffect, useState } from "react";
import { StackItem } from "./components/Stack";
import "./styles.css";

export default function App() {
  const [newVal, setNewVal] = useState("");
  const [stack, setStack] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [peekValue, setPeekValue] = useState("");

  useEffect(() => {
    if (stack.length != 4 || stack.length != 0) {
      setErrorMsg("");
    }
    setPeekValue("");
  }, [stack]);

  function pushToStack() {
    if (stack.length == 4) {
      setErrorMsg("Stack overflow! Stack is full!");
    } else {
      setStack((prevStackState) => [...prevStackState, newVal]);
      setNewVal("");
    }
  }

  function popToStack() {
    if (stack.length == 0) {
      setErrorMsg("Stack underflow! Stack is empty!");
    } else {
      setStack((prevStackState) => {
        let newStackState = prevStackState.slice(0, prevStackState.length - 1);
        return [...newStackState];
      });
    }
  }

  function showTopValue() {
    if (stack.length == 0) {
      setErrorMsg("Stack underflow! Stack is empty!");
    } else {
      setPeekValue(stack[stack.length - 1]);
    }
  }

  function clearStack() {
    setStack([]);
  }

  return (
    <div className="App">
      <input
        value={newVal}
        onChange={(event) => {
          setNewVal(event.target.value);
        }}
      />
      <div className="operations-container">
        <button onClick={pushToStack}>Push</button>
        <button onClick={popToStack}>Pop</button>
        <button onClick={showTopValue}>Peek</button>
        <button onClick={clearStack}>Clear</button>
      </div>
      <div className="stack">
        {stack.length > 0 &&
          stack.map((stackItem, index) => (
            <StackItem key={index} stackItem={stackItem} />
          ))}
      </div>
      {errorMsg && <p>Error: {errorMsg}</p>}
      {peekValue && <p>Top: {peekValue}</p>}
    </div>
  );
}
