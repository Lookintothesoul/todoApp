import { TTodo } from "../../store/todosSlice.ts";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleCompleteTodo, delTodo } from "../../store/todosSlice.ts";
import { DraggableProvided } from "react-beautiful-dnd";

export const Todo: FC<{ todo: TTodo; provided: DraggableProvided }> = ({
  todo,
  provided,
}) => {
  const dispatch = useDispatch();

  const handleChangeCallback = useCallback(() => {
    dispatch(toggleCompleteTodo({ id: todo.id }));
  }, [todo.id]);

  const handleDeleteCallback = useCallback(() => {
    dispatch(delTodo({ id: todo.id }));
  }, [todo.id]);

  return (
    <div
      className="todo-container"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div>
        <input
          id={"checkTodo-" + todo.id}
          type="checkbox"
          checked={todo.complete}
          onChange={handleChangeCallback}
        />
        <label htmlFor={"checkTodo-" + todo.id}>{todo.title}</label>
      </div>
      <button
        type="button"
        onClick={handleDeleteCallback}
        title="Удалить задачу"
      >
        ❌
      </button>
    </div>
  );
};
