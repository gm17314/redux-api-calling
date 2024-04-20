import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./feature/todoSlice";

const App = () => {
  const dispatch = useDispatch();
  const todo = useSelector((store) => store.todo.data);
  const data = todo;

  return (
    <div>
      <button onClick={() => dispatch(fetchTodos())}>Get Data</button>
      <br />
      {JSON.stringify(data)}
    </div>
  );
};

export default App;
