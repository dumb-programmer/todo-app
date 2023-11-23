"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import clsx from "clsx";
import { z } from "zod";
import { login } from "../lib/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        validator: zodValidator
    });
    const [state, formAction] = useFormState(login, undefined);

    return <form.Provider>
        <form action={formAction} className="card-body">
            <form.Field name="email" onChange={z.string().email()}>
                {
                    (field) => (<div className="form-control relative">
                        <label className="label" htmlFor={field.name}>Email</label>
                        <input className={clsx("input input-bordered", field.state.meta.errors.length > 0 || state?.errors.email && "input-error border-error")} type="email" id="email" name={field.name} onChange={(e) => field.handleChange(e.target.value)} required />
                        {field.state.meta.isValidating && <div className="loading h-25 w-25 absolute top-[50px] right-2"></div>}
                        <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.email && state?.errors.email[0]}</p>
                    </div>)
                }
            </form.Field>
            <form.Field name="password" onChange={z.string().min(8, { message: "Password must be atleast 8 characters long" })}>
                {
                    (field) => (<div className="form-control">
                        <label className="label" htmlFor={field.name}>Password</label>
                        <input className={clsx("input input-bordered", field.state.meta.errors.length > 0 || state?.errors.password && "input-error border-error")} type="password" id="password" name={field.name} onChange={(e) => field.handleChange(e.target.value)} required />
                        <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.password && state?.errors.password[0]}</p>
                    </div>)
                }
            </form.Field>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitted]}>
                {
                    ([canSubmit, isSubmitted]) => (<div className="form-control mt-5">
                        <button className="btn btn-primary" disabled={!canSubmit}>Login</button>
                    </div>)
                }
            </form.Subscribe>
        </form>
    </form.Provider>;
}