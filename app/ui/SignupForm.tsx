"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import clsx from "clsx";
import { z } from "zod";
import { signup } from "../lib/actions";
import { useFormState } from "react-dom";

export default function SignupForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    });
    const [state, formAction] = useFormState(signup, undefined);

    return <form.Provider>
        <form action={formAction} className="card-body">
            <form.Field name="email" onChangeAsync={async (value) => {
                if (!value) {
                    return "Email is required";
                }
                const schema = z.string().email();
                if (!schema.safeParse(value).success) {
                    return "Email must be in email format";
                }
                const response = await fetch(`http://localhost:3000/api/email_available?email=${value}`);
                if (response.ok) {
                    const { available } = await response.json();
                    if (!available) {
                        return "This email is already taken";
                    }
                }
                return undefined;
            }} onChangeAsyncDebounceMs={500}>
                {
                    (field) => (<div className="form-control relative">
                        <label className="label" htmlFor={field.name}>Email</label>
                        <input className={clsx("input input-bordered", (field.state.meta.errors.length > 0 || state?.errors?.email) && "input-error border-error")} type="email" id="email" name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} required />
                        {field.state.meta.isValidating && <div className="loading h-25 w-25 absolute top-[50px] right-2"></div>}
                        <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.email && state?.errors.email[0]}</p>
                    </div>)
                }
            </form.Field>
            <form.Field name="password" onChange={z.string().min(8, { message: "Password must be atleast 8 characters long" })} validator={zodValidator}>
                {
                    (field) => (<div className="form-control">
                        <label className="label" htmlFor={field.name}>Password</label>
                        <input className={clsx("input input-bordered", (field.state.meta.errors.length > 0 || state?.errors?.password) && "input-error border-error")} type="password" id="password" name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} required />
                        <p className="text-red-500 text-xs mt-2">{field.state.meta.errors[0] || state?.errors?.password && state?.errors.password[0]}</p>
                    </div>)
                }
            </form.Field>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitted]}>
                {
                    ([canSubmit, isSubmitted]) => (<div className="form-control mt-5">
                        <button className="btn btn-primary" disabled={!canSubmit}>Signup</button>
                    </div>)
                }
            </form.Subscribe>
        </form>
    </form.Provider>;
}