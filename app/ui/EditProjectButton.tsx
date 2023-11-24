"use client";

import { PencilIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { Project } from "@prisma/client";
import EditProjectForm from "./EditProjectForm";


export default function EditProjectButton({ project }: { project: Omit<Project, "userId"> }) {
    const formRef = useRef<HTMLDialogElement>(null);

    return <>
        <button className="btn btn-xs" onClick={(e) => {
            e.preventDefault();
            formRef.current?.showModal();
        }}>
            <PencilIcon height={12} />
        </button>
        <EditProjectForm formRef={formRef} project={project} />
    </>;
}