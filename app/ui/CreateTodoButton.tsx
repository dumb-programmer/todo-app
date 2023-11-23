"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import CreateTodoForm from "./CreateTodoForm";
import { useRef } from "react";

export default function CreateTodoButton() {
    const formRef = useRef<HTMLDialogElement>();

    return <div>
        <div className="mt-10 flex gap-5">
            <button className="btn btn-xs" onClick={() => formRef.current?.showModal()}><PlusIcon height={20} /></button>
            <p className="text-gray-500">Add task</p>
        </div>
        <CreateTodoForm formRef={formRef} />
    </div>;
}