import { localStoreKeys } from "../utils/constants.ts";
import { TTodo } from "../store/todosSlice.ts";

export const saveTodoListLocal = (list: TTodo[]) => {
  localStorage.setItem(localStoreKeys.todoList, JSON.stringify(list));
};

export const getTodoListLocal = () => {
  const data = localStorage.getItem(localStoreKeys.todoList);

  if (data !== null) {
    return JSON.parse(data);
  }

  return [];
};
