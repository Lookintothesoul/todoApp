import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addTodo,
  applyList,
  delTodo,
  toggleCompleteTodo,
} from "./todosSlice.ts";
import { saveTodoListLocal } from "../localForage/localStore.ts";
import { RootState } from "./store.ts";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(applyList, addTodo, delTodo, toggleCompleteTodo),
  effect: (_action, listenerApi) => {
    const todos = (listenerApi.getState() as RootState).todos.TodoList;
    saveTodoListLocal(todos);
  },
});
