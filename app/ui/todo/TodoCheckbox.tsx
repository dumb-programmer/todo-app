"use client";

import { usePathname } from "next/navigation";
import { deleteTodo } from "@/app/lib/actions";
import { useState } from "react";

export default function TodoCheckbox({ todoId, onCheck }: { todoId: string, onCheck: () => void }) {
    const [clicked, setClicked] = useState(false);
    const path = usePathname();
    const deleteTodoWithId = deleteTodo.bind(null, todoId, path);

    return <form action={deleteTodoWithId}>
        <input className="checkbox checkbox-primary rounded-3xl" type="checkbox" onChange={clicked ? undefined : async () => {
            await deleteTodoWithId();
            onCheck();
            setClicked(true);
        }} />
    </form>;
}