import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice.ts";
import { listenerMiddleware } from "./middleware.ts";
import { getTodoListLocal } from "../localForage/localStore.ts";

export const store = configureStore({
  preloadedState: {
    todos: {
      TodoList: getTodoListLocal(),
    },
  },
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
