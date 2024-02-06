import { getProject, getTodos } from "@/app/lib/data";
import TodoList from "@/app/ui/todo/TodoList";

export default async function Page({ params }: { params: { id: string } }) {
    const project = await getProject(params.id);
    const todoItems = await getTodos(params.id);

    return <div>
        <div>
            <h1 className="font-bold text-3xl">{project?.name}</h1>
            <TodoList todoItems={todoItems} fetchMoreUrl={`http://localhost:3000/api/todo?projectId=${params.id}`} showAddTodoBtn />
        </div>
    </div>;
}