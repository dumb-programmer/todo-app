import { getTodayTodos } from "../lib/data";
import TodoList from "@/app/ui/todo/TodoList";
import getUser from "../lib/getUser";

export default async function Home() {
  const user = await getUser();
  const todoItems = await getTodayTodos(user.email);

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
