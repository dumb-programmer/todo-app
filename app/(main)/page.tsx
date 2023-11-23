import { getTodayTodos } from "../lib/data";
import Todo from "../ui/Todo";

export default async function Home() {
  const todos = await getTodayTodos();

  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl">Today</h1>
        <p>{new Date().toLocaleDateString("en-PK", { day: "numeric", month: "long" })}</p>
        <div className="mt-10 flex flex-col gap-10">
          {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
        </div>
      </div>
    </div>
  )
}
