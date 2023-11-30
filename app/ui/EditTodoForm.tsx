"use client";

import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import SubmitButton from "./SubmitButton";
import { editTodo } from "../lib/actions";
import { useFormState } from "react-dom";
import { Priority, Todo } from "@prisma/client";
import React, { useEffect } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date).replaceAll("/", "-");
}


export default function EditTodoForm({ formRef, todo, onEdit }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, todo: Todo, onEdit: (todo: Todo) => void }) {
    const form = useForm({
        defaultValues: {
            title: todo.title,
            description: todo.description,
            due: todo.due,
            priority: todo.priority
        },
        validator: zodValidator
    });
    const path = usePathname();
    const editTodoWithId = editTodo.bind(null, todo.id, path);
    const [state, action] = useFormState(editTodoWithId, null);

    useEffect(() => {
        if (state?.success) {
            form.reset();
            onEdit(state.data);
            formRef.current?.close();
        }
    }, [state, form, formRef, onEdit]);

    return <dialog className="modal" ref={formRef}>
        <div className="modal-box prose">
            <form.Provider>
                <form action={action}>
                    <h1 className="text-2xl font-bold">Edit Todo</h1>
                    <form.Field name="title" onChange={z.string().min(4, "Title must be atleast 4 characters")}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Title</label>
                                <input type="text"
                                    name={field.name}
                                    id={field.name}
                                    className={clsx("input input-bordered", state?.errors?.title && "input-error")}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    required />
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
                                    className={clsx("textarea textarea-bordered", state?.errors?.description && "input-error")}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}></textarea>
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.description && state?.errors.description[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="due" onChange={z.date()}>
                        {
                            (field) => (<div className="form-control">
                                <label htmlFor={field.name}>Due</label>
                                <input type="date"
                                    name={field.name}
                                    id={field.name}
                                    className={clsx("input input-bordered", state?.errors?.due && "input-error")}
                                    // value={formatDate(mew Date(field.state.value))}
                                    min={getToday()}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(new Date(e.target.value))}
                                    required />
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.due && state?.errors.due[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="priority" onChange={z.nativeEnum(Priority)}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Priority</label>
                                <select name={field.name}
                                    className={clsx("select select-bordered", state?.errors?.priority && "input-error")}
                                    id={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value as Priority)} required >
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
                                <button type="button" className="btn" onClick={() => formRef.current?.close()}>Cancel</button>
                                <SubmitButton label="Create" canSubmit={canSubmit} />
                            </div>)
                        }
                    </form.Subscribe>
                </form>
            </form.Provider>
        </div>
    </dialog >
}