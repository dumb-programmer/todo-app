"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import DeleteProjectForm from "./DeleteProjectForm";


export default function DeleteProjectButton({ projectId }: { projectId: string }) {
    const formRef = useRef<HTMLDialogElement>(null);

    return <>
        <button className="btn btn-xs" onClick={(e) => {
            e.preventDefault();
            formRef.current?.showModal();
        }}>
            <TrashIcon height={12} color="red" />
        </button>
        <DeleteProjectForm formRef={formRef} projectId={projectId} />
    </>;
}