"use client";

import { PencilIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { Todo } from "@prisma/client";
import EditTodoForm from "./EditTodoForm";


export default function EditTodoButton({ todo }: { todo: Todo }) {
    const formRef = useRef<HTMLDialogElement>(null);
    return <>
        <button className="btn btn-xs" onClick={(e) => {
            e.preventDefault();
            formRef.current?.showModal();
        }}>
            <PencilIcon height={15} />
        </button>
        <EditTodoForm formRef={formRef} todo={todo} />
    </>;
}