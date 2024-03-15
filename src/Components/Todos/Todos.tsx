import "./todos.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { Todo } from "./Todo.tsx";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

type FilterKey = "all" | "completed" | "notcompleted";

export const Todos = () => {
  const [filter, setFilter] = useState("all");
  const storeTodos = useSelector((state: RootState) => state.todos.TodoList);
  const todos = storeTodos.filter((todo) => {
    switch (filter) {
      case "all":
        return true;
      case "completed":
        return todo.complete;
      case "notcompleted":
        return !todo.complete;
    }
  });

  const handleChangeFilter = (key: FilterKey) => {
    setFilter(key);
  };

  return (
    <>
      <div className="filters-container">
        <button
          {...(filter === "all" ? { className: "active" } : null)}
          onClick={() => handleChangeFilter("all")}
        >
          Все
        </button>
        <button
          {...(filter === "completed" ? { className: "active" } : null)}
          onClick={() => handleChangeFilter("completed")}
        >
          Выполненнные
        </button>
        <button
          {...(filter === "notcompleted" ? { className: "active" } : null)}
          onClick={() => handleChangeFilter("notcompleted")}
        >
          Не выполненные
        </button>
      </div>
      {todos.length > 0 ? (
        <Droppable droppableId="todos-list">
          {(provided, snapshot) => (
            <div
              className="todos-container"
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "#3b3b3b"
                  : "#242424",
              }}
              {...provided.droppableProps}
            >
              {todos.map((todo, index) => (
                <Draggable
                  draggableId={String(todo.id)}
                  key={todo.id}
                  index={index}
                >
                  {(provided) => (
                    <Todo provided={provided} key={todo.id} todo={todo} />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        <span>Задач не найдено...</span>
      )}
    </>
  );
};
