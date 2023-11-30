import { Project } from "@prisma/client";
import ProjectLink from "./ProjectLink";
import { useInfiniteScroll } from "../lib/hooks/useInfiniteScroll";
import React, { useCallback, useRef } from "react";
import CreateProjectForm from "./CreateProjectForm";

export default function ProjectLinksList({ projects, formRef, showProjects }: { projects: { rows: Project[], hasMore: boolean }, formRef: React.RefObject<HTMLDialogElement>, showProjects: boolean }) {
    const scrollElement = useRef<HTMLDivElement>(null);

    const { data, isLoading, prependItem, updateItem, deleteItem } = useInfiniteScroll(projects, scrollElement, useCallback((page) => fetch(`http://localhost:3000/api/projects?page=${page}`), []));

    return (
        <>
            <ul className="menu">
                {
                    showProjects && data.rows.map(project => <ProjectLink key={project.id} project={project} onEdit={updateItem} onDelete={deleteItem} />)
                }
                {isLoading && <div className="flex justify-center"><div className="loading loading-spinner"></div></div>}
                <div ref={scrollElement}></div>
            </ul>
            <CreateProjectForm formRef={formRef} onSuccess={prependItem} />
        </>
    )
}