import { FormEvent, useRef, useState } from "react";
import { iconMoon, iconSun } from "./assets/index";
import TodoCard from "./components/TodoCard";
import useLocalStorage from "./hooks/useLocalStorage";
import useMode from "./hooks/useMode";
import { v4 as uuidV4 } from "uuid";

export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

function App() {
  const [mode, handleToggleMode] = useMode();
  const [todos, setTodos] = useLocalStorage<Todo[]>("TODOS", []);
  const [filter, setFilter] = useState("all");

  const titleRef = useRef<HTMLInputElement>(null);

  const createTodo = (data: Todo) => {
    setTodos((prevTodos) => [...prevTodos, data]);
    titleRef.current!.value = "";
  };

  const toggleCheck = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current?.value) return;

    console.log(titleRef.current!.value);

    createTodo({
      id: uuidV4(),
      title: titleRef.current!.value,
      isCompleted: false,
    });
  };

  let filteredTodos = todos;

  if (filter === "active")
    filteredTodos = todos.filter((todo) => !todo.isCompleted);

  if (filter === "completed")
    filteredTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <main className="bg-veryLightGray dark:bg-veryDarkBlue bg-[url('./assets/images/bg-mobile-light.jpg')]  dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')] bg-contain bg-no-repeat h-screen w-screen flex justify-center md:items-center text-xs xl:text-base">
      {/* container */}
      <div className="w-[35rem] xl:w-[40rem] px-8">
        <header className="flex justify-between items-center w-full mt-10 mb-9">
          <h1 className="text-3xl xl:text-5xl font-bold tracking-[0.3em] text-white">
            TODO
          </h1>
          <button onClick={handleToggleMode}>
            <img
              src={mode === "dark" ? iconSun : iconMoon}
              alt={mode === "dark" ? "icon-sun" : "icon-moon"}
              className="w-5 h-5 xl:w-10 xl:h-10"
            />
          </button>
        </header>
        <main className="w-full flex flex-col gap-4 xl:gap-6 items-center">
          {/* input */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex gap-4 p-3 xl:p-5 px-5 xl:px-8 rounded-lg items-center bg-white dark:bg-veryDarkDesaturatedBlue text-darkGrayishBlue"
          >
            <div className="border dark:border-veryDarkGrayishBlue2 rounded-full basis-5 w-5 h-5" />
            <input
              placeholder="Create a new todo..."
              className="text-veryDarkGrayishBlue dark:text-lightGrayishBlue placeholder:text-lightGrayishBlue placeholder:dark:text-darkGrayishBlue  flex-1 h-6 outline-none border-none bg-transparent text-xs xl:text-sm"
              required
              ref={titleRef}
            />
          </form>
          {/* todo list */}
          <div className="w-full flex flex-col h-96">
            <div className="bg-white dark:bg-veryDarkDesaturatedBlue rounded-lg shadow-lg">
              <div className="flex flex-col max-h-80 overflow-auto">
                {filteredTodos?.map((el) => (
                  <TodoCard
                    key={el.id}
                    id={el.id}
                    isCompleted={el.isCompleted}
                    title={el.title}
                    toggleCheck={toggleCheck}
                    deleteTodo={deleteTodo}
                  />
                ))}
                {!filteredTodos.length && (
                  <p className="text-darkGrayishBlue text-center py-4 border-b dark:border-b-veryDarkGrayishBlue2">
                    There's no {filter !== "all" && filter} todo yet
                  </p>
                )}
              </div>
              <div className="p-5 flex items-center justify-between text-darkGrayishBlue dark:text-darkGrayishBlue">
                <p className="flex-1">{`${todos.length} ${
                  todos.length > 1 ? "items" : "item"
                } left`}</p>
                <div className="flex-1 flex gap-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "text-brightBlue" : ""}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("active")}
                    className={filter === "active" ? "text-brightBlue" : ""}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={filter === "completed" ? "text-brightBlue" : ""}
                  >
                    Completed
                  </button>
                </div>
                <button className="flex-1 text-end" onClick={clearCompleted}>
                  Clear Completed
                </button>
              </div>
            </div>
          </div>
          {/* todo options */}
          <div className="w-full p-3 px-6 flex md:hidden gap-4 justify-center items-center bg-white dark:bg-veryDarkDesaturatedBlue rounded-lg shadow-lg text-base text-darkGrayishBlue">
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? "text-brightBlue" : ""}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={filter === "active" ? "text-brightBlue" : ""}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "text-brightBlue" : ""}
            >
              Completed
            </button>
          </div>
        </main>
      </div>
    </main>
  );
}

export default App;
