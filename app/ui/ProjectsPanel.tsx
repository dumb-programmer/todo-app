"use client";

import { useRef, useState } from "react";
import CreateProjectForm from "./CreateProjectForm";
import Project from "./Project";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/20/solid";

interface Project {
    id: string;
    name: string;
}

export default function ProjectsPanel({ projects }: { projects: Project[] }) {
    const formRef = useRef<HTMLDialogElement>();
    const [showProjects, setShowProjects] = useState(true);

    return <>
        <div className="px-7 mt-10">
            <div className="flex justify-between">
                <h2 className="font-bold">Projects</h2>
                <div className="flex gap-5">
                    <button className="btn btn-sm" onClick={() => formRef?.current?.showModal()}><PlusIcon height={20} /></button>
                    <button className="btn btn-sm" onClick={() => setShowProjects(showProjects => !showProjects)}>{showProjects ? <ChevronDownIcon height={20} /> : <ChevronUpIcon height={20} />}</button>
                </div>
            </div>
            {
                showProjects && <ul className="menu">
                    {
                        projects.map(project => <Project key={project.id} project={project} />)
                    }
                </ul>
            }
        </div>
        <CreateProjectForm formRef={formRef} />
    </>;
}