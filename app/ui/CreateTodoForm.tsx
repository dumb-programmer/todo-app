"use client";

import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import SubmitButton from "./SubmitButton";
import { useParams } from "next/navigation";
import { createTodo } from "../lib/actions";
import { useFormState } from "react-dom";
import { Priority } from "@prisma/client";
import { useEffect } from "react";

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export default function CreateTodoForm({ formRef }) {
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
    const createTodoWithProjectId = createTodo.bind(null, id);
    const [state, action] = useFormState(createTodoWithProjectId, null);
    useEffect(() => {
        if (state?.success) {
            form.reset();
            formRef.current.close();
        }
    }, [state, form, formRef]);

    return <dialog className="modal" ref={formRef}>
        <div className="modal-box">
            <form id="todo-form-modal"></form>
            <form.Provider>
                <form action={action}>
                    <h1 className="text-3xl font-bold">Create Todo</h1>
                    <form.Field name="title" onChange={z.string().min(4, "Title must be atleast 4 characters")}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Title</label>
                                <input name={field.name} id={field.name} className="input input-bordered" type="text" onChange={(e) => field.handleChange(e.target.value)} required />
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.title && state?.errors.title[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="description" onChange={z.string()}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Description</label>
                                <textarea name={field.name} id={field.name} className="input input-bordered" onChange={(e) => field.handleChange(e.target.value)} required></textarea>
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.description && state?.errors.description[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="due" onChange={z.string()}>
                        {
                            (field) => (<div className="form-control">
                                <label htmlFor={field.name}>Due</label>
                                <input type="date" className="input input-bordered" name={field.name} id={field.name} defaultValue={getToday()} min={getToday()} onChange={(e) => field.handleChange(e.target.value)} required />
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.due && state?.errors.due[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="priority" onChange={z.nativeEnum(Priority)}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Priority</label>
                                <select name={field.name} id={field.name} defaultValue="HIGH" className="select select-bordered" onChange={(e) => field.handleChange(e.target.value)} required >
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
                                <button type="button" className="btn" form="todo-form-modal" onClick={() => formRef.current.close()}>Cancel</button>
                                <SubmitButton label="Create" canSubmit={canSubmit} />
                            </div>)
                        }
                    </form.Subscribe>
                </form>
            </form.Provider>
        </div>
    </dialog >
}