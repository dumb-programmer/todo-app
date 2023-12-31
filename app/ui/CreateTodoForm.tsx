"use client";

import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import SubmitButton from "./SubmitButton";
import { useParams } from "next/navigation";
import { createTodo } from "../lib/actions";
import { useFormState } from "react-dom";
import { Priority, Todo } from "@prisma/client";
import React, { useEffect } from "react";
import clsx from "clsx";

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export default function CreateTodoForm({ formRef, onSuccess }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, onSuccess: (todo: Todo) => void }) {
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            due: "",
            priority: ""
        },
        validator: zodValidator
    });
    const { id } = useParams();
    const createTodoWithProjectId = createTodo.bind(null, Array.isArray(id) ? id[0] : id);
    const [state, action] = useFormState(createTodoWithProjectId, null);

    useEffect(() => {
        if (state?.success) {
            form.reset();
            onSuccess(state.data);
            formRef.current?.close();
        }
    }, [state, form, onSuccess, formRef]);

    return <dialog className="modal" ref={formRef}>
        <div className="modal-box">
            <form id="create-todo-form" method="dialog"></form>
            <form.Provider>
                <form action={action}>
                    <h1 className="text-2xl font-bold">Create Todo</h1>
                    <form.Field name="title" onChange={z.string().min(4, "Title must be atleast 4 characters")}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Title</label>
                                <input type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    className={clsx("input input-bordered", state?.errors?.title && "input-error")}
                                    onChange={(e) => field.handleChange(e.target.value)} required />
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.title && state?.errors.title[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="description" onChange={z.string()}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Description</label>
                                <textarea name={field.name}
                                    id={field.name}
                                    value={field.state.value}
                                    className={clsx("textarea textarea-bordered", state?.errors?.description && "input-error")}
                                    onChange={(e) => field.handleChange(e.target.value)}></textarea>
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.description && state?.errors.description[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="due" onChange={z.string()}>
                        {
                            (field) => (<div className="form-control">
                                <label htmlFor={field.name}>Due</label>
                                <input type="date" className={clsx("input input-bordered", state?.errors?.due && "input-error")} name={field.name} id={field.name} defaultValue={getToday()} min={getToday()} onChange={(e) => field.handleChange(e.target.value)} required />
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.due && state?.errors.due[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="priority" onChange={z.nativeEnum(Priority)}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Priority</label>
                                <select name={field.name} id={field.name} value={field.state.value} defaultValue="HIGH" className={clsx("select select-bordered", state?.errors?.priority && "input-error")} onChange={(e) => field.handleChange(e.target.value)} required >
                                    <option value="HIGH">High</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LOW">Low</option>
                                </select>
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.priority && state?.errors.priority[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Subscribe selector={(state) => [state.canSubmit]}>
                        {
                            ([canSubmit]) => (<div className="modal-action">
                                <button type="submit" className="btn" form="create-todo-form">Cancel</button>
                                <SubmitButton label="Create" canSubmit={canSubmit} />
                            </div>)
                        }
                    </form.Subscribe>
                </form>
            </form.Provider>
        </div>
    </dialog >
}