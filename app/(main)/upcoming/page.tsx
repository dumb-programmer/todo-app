import { getUpcomingTodos } from "@/app/lib/data";
import Todo from "@/app/ui/Todo";

export default async function Home() {
    const todos = await getUpcomingTodos();

    return (
        <div>
            <div>
                <h1 className="font-bold text-3xl">Upcoming</h1>
                <div className="mt-10 flex flex-col gap-10">
                    {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
                </div>
            </div>
        </div>
    )
}
