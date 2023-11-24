"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import DeleteTodoForm from "./DeleteTodoForm";


export default function DeleteTodoButton({ todoId }: { todoId: string }) {
    const formRef = useRef<HTMLDialogElement>(null);

    return <>
        <button className="btn btn-xs" onClick={(e) => {
            e.preventDefault();
            formRef.current?.showModal();
        }}>
            <TrashIcon height={15} color="red" />
        </button>
        <DeleteTodoForm formRef={formRef} todoId={todoId} />
    </>;
}