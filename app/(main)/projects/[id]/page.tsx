import { getProject, getTodos } from "@/app/lib/data";
import CreateTodoButton from "@/app/ui/CreateTodoButton";
import Todo from "@/app/ui/Todo";

export default async function Page({ params }: { params: { id: string } }) {
    const project = await getProject(params.id);
    const todos = await getTodos(params.id);

    return <div>
        <div>
            <h1 className="font-bold text-3xl">{project?.name}</h1>
            <div className="mt-10 flex flex-col gap-10">
                {
                    todos.map(todo => <Todo key={todo.id} todo={todo} />)
                }
            </div>
            <CreateTodoButton />
        </div>
    </div>;
}