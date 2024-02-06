"use client";

import clsx from "clsx";
import { signup } from "../lib/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import SubmitButton from "./SubmitButton";
import { UserSchema } from "../lib/schema";

const formId = "signup";
export default function SignupForm() {
    const { handleSubmit, register, formState: { errors, isValidating }, setError } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(UserSchema)
    });

    return <form id={formId} className="card-body" onSubmit={handleSubmit(async (data) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.set(key, value);
        }
        const result = await signup({}, formData);
        if (result?.errors) {
            if (result.errors.email) {
                setError("email", { message: result.errors.email[0] })
            }
            if (result.errors.password) {
                setError("password", { message: result.errors.password[0] })
            }
        }
    })}>

        <div className="form-control relative">
            <label className="label" htmlFor="email">Email</label>
            <input className={clsx("input input-bordered", errors.email?.message && "input-error border-error")} id="email" {...register("email")} required />
            <p className="text-red-500 text-xs mt-2">{errors.email?.message}</p>
        </div>

        <div className="form-control">
            <label className="label" htmlFor="password">Password</label>
            <input className={clsx("input input-bordered", errors.password?.message && "input-error border-error")} type="password" id="password" {...register("password")} required />
            <p className="text-red-500 text-xs mt-2">{errors.password?.message}</p>
        </div>
        <div className="form-control mt-5">
            <SubmitButton form={formId} canSubmit={!isValidating} label="Signup" />
        </div>
    </form >;
}