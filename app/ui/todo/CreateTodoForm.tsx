"use client";

import SubmitButton from "../SubmitButton";
import { useParams } from "next/navigation";
import { createTodo } from "../../lib/actions";
import { Priority, Todo } from "@prisma/client";
import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema } from "../../lib/schema";
import { Action, Content, Header, Modal } from "../../components/modal";
import convertToFormData from "../../lib/utils/convertToFormData";

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const formId = "create-todo";
export default function CreateTodoForm({ formRef, onSuccess }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, onSuccess: (todo: Todo) => void }) {
    const { handleSubmit, register, formState: { errors, isSubmitting }, setError, reset } = useForm({
        defaultValues: {
            title: "",
            description: "",
            due: getToday(),
            priority: Priority.HIGH
        },
        resolver: zodResolver(TodoSchema)
    });
    const { id } = useParams();
    const createTodoWithProjectId = createTodo.bind(null, Array.isArray(id) ? id[0] : id);

    return <Modal dialogRef={formRef}>
        <Header>
            <h1 className="text-2xl font-bold">Create Todo</h1>
        </Header>
        <Content>
            <form id={formId} onSubmit={handleSubmit(async (data) => {
                const formData = convertToFormData(data);
                const result = await createTodoWithProjectId({}, formData);
                if (result.success) {
                    reset();
                    onSuccess(result.data);
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
            <SubmitButton form={formId} label="Create" isSubmitting={isSubmitting} />
        </Action>
    </Modal>
}