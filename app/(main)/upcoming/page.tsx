import { getUpcomingTodos } from "@/app/lib/data";
import TodoList from "@/app/ui/todo/TodoList";

export default async function Page() {
    const todoItems = await getUpcomingTodos();

    return (
        <div>
            <div>
                <h1 className="font-bold text-3xl">Upcoming</h1>
                <div className="mt-2 flex flex-col gap-10">
                    <TodoList todoItems={todoItems} fetchMoreUrl="http://localhost:3000/api/todo/upcoming" />
                </div>
            </div>
        </div>
    )
}
