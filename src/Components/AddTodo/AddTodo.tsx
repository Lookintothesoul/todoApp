import React, { useState } from "react";
import "./addtodo.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todosSlice.ts";

export const AddTodo = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo({ title: value }));
    setValue("");
  };

  return (
    <form className="addTodo-form" onSubmit={handleAddTodo}>
      <input type="text" value={value} onChange={handleChange} required />
      <button title="Добавить задачу">➕</button>
    </form>
  );
};
