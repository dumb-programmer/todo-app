import { CalendarIcon, FlagIcon } from "@heroicons/react/20/solid";
import { Priority, Todo } from "@prisma/client";
import TodoCheckbox from "./TodoCheckbox";
import EditTodoButton from "./EditTodoButton";

function getPriority(priority: Priority) {
    switch (priority) {
        case "HIGH":
            return "#f52c2c";
        case "MEDIUM":
            return "#f2691f";
        case "LOW":
            return "#6ef553";
    }
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export default function Todo({ todo }: { todo: Todo }) {
    return <div className="flex items-center justify-between">
        <div className="flex gap-5">
            <div className="mt-5">
                <TodoCheckbox todoId={todo.id} />
            </div>
            <div>
                <h2 className="text-lg">{todo?.title}</h2>
                <p className="text-gray-500 text-xs mt-2">{todo?.description}</p>
                <div className="flex gap-2 text-xs mt-2">
                    <CalendarIcon height={15} />
                    <p>{formatDate(todo?.due)}</p>
                    <FlagIcon className="ml-2" height={15} color={getPriority(todo?.priority)} />
                </div>
            </div>
        </div>
        <div className="flex gap-2">
            <EditTodoButton todo={todo} />
        </div>
    </div>;
}