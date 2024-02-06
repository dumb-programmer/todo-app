"use client";

import SubmitButton from "../SubmitButton";
import { useParams } from "next/navigation";
import { editTodo } from "../../lib/actions";
import { Todo } from "@prisma/client";
import React, { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema } from "../../lib/schema";
import { Action, Content, Header, Modal } from "../../components/modal";
import convertToFormData from "../../lib/utils/convertToFormData";

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const formId = "edit-todo";
export default function EditTodoForm({ formRef, todo, onEdit }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, todo: Todo, onEdit: (todo: Todo) => void }) {
    const { handleSubmit, register, formState: { errors, isSubmitting }, setError, reset, setValue } = useForm<Todo>({
        resolver: zodResolver(TodoSchema)
    });
    const { id } = useParams();
    const editTodoWithId = editTodo.bind(null, todo?.id, id as string);

    useEffect(() => {
        if (todo) {
            for (const [key, value] of Object.entries(todo)) {
                if (key === "due") {
                    setValue(key, formatDate(value as Date));
                }
                else {
                    setValue(key, value);
                }
            }
        }
    }, [todo, setValue]);

    return <Modal dialogRef={formRef}>
        <Header>
            <h1 className="text-2xl font-bold">Create Todo</h1>
        </Header>
        <Content>
            <form id={formId} onSubmit={handleSubmit(async (data) => {
                const formData = convertToFormData(data);
                const result = await editTodoWithId({}, formData);
                if (result.success) {
                    reset();
                    onEdit(result.data);
                    formRef.current?.close();
                }
                if (result.errors) {

                }
            })}>
                <div className="form-control">
                    <label className="label" htmlFor="title">Title</label>
                    <input type="text"
                        className={clsx("input input-bordered", errors.title?.message && "input-error")}
                        {...register("title")}
                    />
                    <p className="text-red-500 text-xs mt-2">{errors.title?.message}</p>
                </div><div className="form-control">
                    <label className="label" htmlFor="description">Description</label>
                    <textarea className={clsx("textarea textarea-bordered", errors.description?.message && "input-error")}
                        {...register("description")}></textarea>
                    <p className="text-red-500 text-xs mt-2">{errors.description?.message}</p>
                </div><div className="form-control">
                    <label htmlFor="due">Due</label>
                    <input type="date" className={clsx("input input-bordered", errors.due?.message && "input-error")}
                        {...register("due")}
                    />
                    <p className="text-red-500 text-xs mt-2">{errors.due?.message}</p>
                </div><div className="form-control">
                    <label className="label" htmlFor="priority">Priority</label>
                    <select className={clsx("select select-bordered", errors?.priority?.message && "input-error")} {...register("priority")} >
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                    <p className="text-red-500 text-xs mt-2">{errors.priority?.message}</p>
                </div><div className="modal-action">

                </div>
            </form>
        </Content>
        <Action>
            <button className="btn" onClick={() => formRef.current?.close()}>Cancel</button>
            <SubmitButton form={formId} label="Save" isSubmitting={isSubmitting} />
        </Action>
    </Modal>
}