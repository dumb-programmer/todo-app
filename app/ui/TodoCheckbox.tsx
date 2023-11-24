"use client";

import { usePathname } from "next/navigation";
import { deleteTodo } from "../lib/actions";

export default function TodoCheckbox({ todoId }: { todoId: string }) {
    const path = usePathname();
    const deleteTodoWithId = deleteTodo.bind(null, todoId, path);

    return <form id={`todo-${todoId}`} action={deleteTodoWithId}>
        <input className="checkbox checkbox-primary rounded-3xl" type="checkbox" onChange={() => {
            const form: HTMLFormElement | null = document.querySelector(`#todo-${todoId}`);
            form?.requestSubmit();
        }} />
    </form>;
}