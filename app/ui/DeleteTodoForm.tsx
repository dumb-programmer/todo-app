"use client";

import React from "react";
import { deleteTodo } from "../lib/actions";
import { usePathname } from "next/navigation";

export default function DeleteTodoForm({ formRef, todoId }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, todoId: string }) {
    const path = usePathname();
    const deleteTodoWithId = deleteTodo.bind(null, todoId, path);

    return <dialog className="modal" ref={formRef}>
        <div className="modal-box">
            <form id={`delete-project-${todoId}-form`} action={deleteTodoWithId}>
                <div className="prose">
                    <h1 className="text-2xl font-bold">Delete Todo</h1>
                    <p>Are you sure you want to delete this todo? This action is non-recoverable.</p>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={(e) => {
                        e.preventDefault();
                        formRef?.current?.close();
                    }}>Cancel</button>
                    <button type="submit" className="btn btn-error">Delete</button>
                </div>
            </form>
        </div>
    </dialog>
}