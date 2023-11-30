"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import CreateTodoForm from "./CreateTodoForm";
import { useRef } from "react";
import { Todo } from "@prisma/client";

export default function CreateTodoButton({ onSuccess }: { onSuccess: (todo: Todo) => void }) {
    const formRef = useRef<HTMLDialogElement>(null);

    return <div>
        <div className="flex gap-5 pb-8">
            <button className="btn btn-xs" onClick={() => formRef.current?.showModal()}><PlusIcon height={20} /></button>
            <p className="text-gray-500">Add task</p>
        </div>
        <CreateTodoForm formRef={formRef} onSuccess={onSuccess} />
    </div>;
}