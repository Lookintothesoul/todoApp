import "./App.css";
import { Todos } from "./Components/Todos/Todos.tsx";
import { AddTodo } from "./Components/AddTodo/AddTodo.tsx";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store.ts";
import { applyList } from "./store/todosSlice.ts";

function App() {
  const todos = useSelector((state: RootState) => state.todos.TodoList);
  const dispatch = useDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const copyTodos = [...todos];
    const [removed] = copyTodos.splice(source.index, 1);

    if (destination) {
      copyTodos.splice(destination.index, 0, removed);
      dispatch(applyList({ todos: copyTodos }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main>
        <h2>Добавить задачу</h2>
        <AddTodo />
        <h2>Список задач</h2>
        <span>
          (Для перетаскивания задачи в списке, потяните за
          нее&nbsp;&nbsp;&#8432;)
        </span>
        <Todos />
      </main>
    </DragDropContext>
  );
}

export default App;
