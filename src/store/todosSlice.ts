import { createSlice } from "@reduxjs/toolkit";

export type TTodo = {
  id: number;
  complete: boolean;
  title: string;
};

export interface TodosState {
  TodoList: TTodo[];
}

const initialState: TodosState = {
  TodoList: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      { payload }: { payload: { title: string }; type: string },
    ) => {
      state.TodoList.push({
        id: Number(new Date()),
        complete: false,
        title: payload.title,
      });
    },
    toggleCompleteTodo: (state, { payload }: { payload: { id: number } }) => {
      const index = state.TodoList.findIndex((todo) => todo.id === payload.id);

      if (index >= 0) {
        state.TodoList[index].complete = !state.TodoList[index].complete;
      }
    },
    delTodo: (state, { payload }: { payload: { id: number } }) => {
      state.TodoList = state.TodoList.filter((todo) => todo.id !== payload.id);
    },
    applyList: (state, { payload }: { payload: { todos: TTodo[] } }) => {
      state.TodoList = payload.todos;
    },
  },
});

export const { addTodo, toggleCompleteTodo, delTodo, applyList } =
  todosSlice.actions;

export default todosSlice.reducer;
