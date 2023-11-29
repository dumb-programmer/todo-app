"use client";

import { useRef, useState } from "react";
import CreateProjectForm from "./CreateProjectForm";
import ProjectLink from "./ProjectLink";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Project } from "@prisma/client";


export default function ProjectsPanel({ projects }: { projects: Omit<Project, "userId">[] }) {
    const formRef = useRef<HTMLDialogElement>(null);
    const [showProjects, setShowProjects] = useState(true);

    return <>
        <div className="px-7 mt-10">
            <div className="flex justify-between items-center gap-2">
                <h2 className="font-bold">Projects</h2>
                <div className="flex gap-5">
                    <button className="btn btn-sm" onClick={() => formRef?.current?.showModal()}><PlusIcon height={20} /></button>
                    <button className="btn btn-sm" onClick={() => setShowProjects(showProjects => !showProjects)}>{showProjects ? <ChevronDownIcon height={20} /> : <ChevronUpIcon height={20} />}</button>
                </div>
            </div>
            {
                showProjects && <ul className="menu">
                    {
                        projects.map(project => <ProjectLink key={project.id} project={project} />)
                    }
                </ul>
            }
        </div>
        <CreateProjectForm formRef={formRef} />
    </>;
}