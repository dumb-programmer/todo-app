import { getOverdueTodos } from "@/app/lib/data";
import TodoList from "@/app/ui/todo/TodoList";

export default async function Home() {
    const todoItems = await getOverdueTodos();

    return (
        <div>
            <div>
                <h1 className="font-bold text-3xl">Overdue</h1>
                <div className="mt-2 flex flex-col gap-10">
                    <TodoList todoItems={todoItems} fetchMoreUrl="http://localhost:3000/api/todo/overdue" />
                </div>
            </div>
        </div>
    )
}
