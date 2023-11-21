"use client";

import { useFormState, useFormStatus } from "react-dom";
import createProject from "../lib/actions";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useEffect } from "react";

export default function CreateProjectForm({ formRef }: { formRef: React.MutableRefObject<HTMLDialogElement | undefined> }) {
    const form = useForm({
        defaultValues: {
            name: "",
            color: "",
        },
        validator: zodValidator
    });

    const [state, formAction] = useFormState(createProject, null);

    return <dialog className="modal" ref={formRef}>
        <div className="modal-box">
            <form id="dialog" method="dialog">
            </form>
            <form.Provider>
                <form action={formAction}>
                    <h1 className="font-bold text-2xl">Create Project</h1>
                    <form.Field name="name" onChange={z.string().min(3)}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Name</label>
                                <input className="input input-bordered" id={field.name} name={field.name} type="text" />
                            </div>)
                        }
                    </form.Field>
                    <form.Field name="color" onChange={z.enum(["red"])}>
                        {(field) => (<div className="form-control">
                            <label className="label" htmlFor={field.name}>Color</label>
                            <select id={field.name} name={field.name} className="select select-bordered">
                                <option>red</option>
                                <option>red</option>
                                <option>red</option>
                                <option>red</option>
                            </select>
                        </div>)}
                    </form.Field>
                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {
                            ([canSubmit, isSubmitting]) => (
                                <div className="modal-action">
                                    <button form="dialog" className="btn">Cancel</button>
                                    <button className="btn btn-primary" disabled={!canSubmit}>Create</button>
                                </div>)
                        }
                    </form.Subscribe>
                </form>
            </form.Provider>
        </div>
    </dialog>
}