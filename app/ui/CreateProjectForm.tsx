"use client";

import { useFormState } from "react-dom";
import createProject from "../lib/actions";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import clsx from "clsx";
import SubmitButton from "./SubmitButton";

export default function CreateProjectForm({ formRef }: { formRef: React.MutableRefObject<HTMLDialogElement | undefined> }) {
    const form = useForm({
        defaultValues: {
            name: "",
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
                                <input className={clsx("input input-bordered", state?.errors.name && "input-error")} id={field.name} onChange={(e) => field.handleChange(e.target.value)} name={field.name} type="text" />
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.name && state?.errors.name[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Subscribe selector={(state) => [state.canSubmit]}>
                        {
                            ([canSubmit]) => (
                                <div className="modal-action">
                                    <button form="dialog" className="btn">Cancel</button>
                                    <SubmitButton label="Create" canSubmit={canSubmit} />
                                </div>)
                        }
                    </form.Subscribe>
                </form>
            </form.Provider>
        </div>
    </dialog>
}