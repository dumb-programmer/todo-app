import { getTodayTodos } from "../lib/data";
import TodoList from "../ui/TodoList";

export default async function Home() {
  const todoItems = await getTodayTodos();

  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl">Today</h1>
        <p>{new Date().toLocaleDateString("en-PK", { day: "numeric", month: "long" })}</p>
        <div className="mt-2 flex flex-col gap-10">
          <TodoList todoItems={todoItems} fetchMoreUrl="http://localhost:3000/api/todo/today" />
        </div>
      </div>
    </div>
  )
}
