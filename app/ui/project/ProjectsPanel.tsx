"use client";

import { useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Project } from "@prisma/client";
import ProjectLinksList from "./ProjectLinksList";


export default function ProjectsPanel({ projects }: { projects: { rows: Project[], hasMore: boolean } }) {
    const newProjectDialog = useRef<HTMLDialogElement>(null);
    const [showProjects, setShowProjects] = useState(true);

    return <>
        <div className="px-7 mt-10">
            <div className="flex justify-between items-center gap-2">
                <h2 className="font-bold">Projects</h2>
                <div className="flex gap-5">
                    <button className="btn btn-sm" onClick={() => newProjectDialog?.current?.showModal()}><PlusIcon height={20} /></button>
                    <button className="btn btn-sm" onClick={() => setShowProjects(showProjects => !showProjects)}>{showProjects ? <ChevronDownIcon height={20} /> : <ChevronUpIcon height={20} />}</button>
                </div>
            </div>
            <ProjectLinksList  projects={projects} formRef={newProjectDialog} showProjects={showProjects} />
        </div>
    </>;
}