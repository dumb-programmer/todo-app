"use client";

import { useFormStatus } from "react-dom";


export default function SubmitButton({ label, canSubmit }: { label: string, canSubmit: boolean }) {
    const { pending } = useFormStatus();

    return <button className="btn btn-primary" disabled={!canSubmit || pending}>{pending ? <span className="loading loading-spinner loading-md"></span> : label}</button>;
}