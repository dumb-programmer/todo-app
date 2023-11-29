"use client";

import { useFormState } from "react-dom";
import { editProject } from "../lib/actions";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import clsx from "clsx";
import { Project } from "@prisma/client";
import { useEffect } from "react";

export default function EditProjectForm({ formRef, project }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, project: Omit<Project, "userId"> }) {
    const form = useForm({
        defaultValues: {
            name: project.name,
        },
        validator: zodValidator
    });
    const editProjectWithId = editProject.bind(null, project);
    const [state, formAction] = useFormState(editProjectWithId, null);

    useEffect(() => {
        if (state?.success) {
            form.reset();
            formRef.current?.close();
        }
    }, [state, form, formRef]);

    return <dialog className="modal" ref={formRef}>
        <div className="modal-box prose">
            <form.Provider>
                <form id={`edit-project-${project.id}-form`} action={formAction}>
                    <h1 className="font-bold text-2xl">Edit Project</h1>
                    <form.Field name="name" onChange={z.string().min(3)}>
                        {
                            (field) => (<div className="form-control">
                                <label className="label" htmlFor={field.name}>Name</label>
                                <input className={clsx("input input-bordered", state?.errors?.name && "input-error")} id={field.name} defaultValue={project.name} onChange={(e) => field.handleChange(e.target.value)} name={field.name} type="text" required />
                                <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.name && state?.errors.name[0]}</p>
                            </div>)
                        }
                    </form.Field>
                    <form.Subscribe selector={(state) => [state.canSubmit]}>
                        {
                            ([canSubmit]) => (
                                <div className="modal-action">
                                    <button type="button" className="btn" onClick={() => formRef?.current?.close()}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" onClick={(e) => {
                                        e.preventDefault();
                                        const form: HTMLFormElement | null = document.querySelector(`#edit-project-${project.id}-form`);
                                        form?.requestSubmit();
                                    }} >Save</button>
                                </div>)
                        }
                    </form.Subscribe>
                </form>
            </form.Provider>
        </div>
    </dialog>
}