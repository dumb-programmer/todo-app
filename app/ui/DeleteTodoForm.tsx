"use client";

import React from "react";
import { deleteTodo } from "../lib/actions";
import { usePathname } from "next/navigation";
import { Action, Content, Header, Modal } from "../components/modal";
import { useForm } from "react-hook-form";

const formId = "delete-todo";
export default function DeleteTodoForm({ formRef, todoId, onDelete }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, todoId: string, onDelete: (id: string) => void }) {
    const path = usePathname();
    const deleteTodoWithId = deleteTodo.bind(null, todoId, path);
    const { handleSubmit } = useForm();

    return <Modal dialogRef={formRef}>
        <Header>
            <h1 className="text-2xl font-bold">Delete Todo</h1>
        </Header>
        <Content>
            <form id={formId} onSubmit={handleSubmit(async () => {
                const result = await deleteTodoWithId();
                if (result?.success) {
                    formRef.current?.close();
                    onDelete(todoId);
                }
            })}>
                <div className="prose">
                    <p>Are you sure you want to delete this todo? This action is non-recoverable.</p>
                </div>
            </form>
        </Content>
        <Action>
            <button type="button" className="btn" onClick={(e) => {
                e.preventDefault();
                formRef?.current?.close();
            }}>Cancel</button>
            <button type="submit" form={formId} className="btn btn-error">Delete</button>
        </Action>
    </Modal>
}