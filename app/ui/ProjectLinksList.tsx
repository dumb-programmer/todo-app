import { Project } from "@prisma/client";
import ProjectLink from "./ProjectLink";
import { useInfiniteScroll } from "../lib/hooks/useInfiniteScroll";
import React, { useCallback, useRef, useState } from "react";
import CreateProjectForm from "./CreateProjectForm";
import EditProjectForm from "./EditProjectForm";
import DeleteProjectForm from "./DeleteProjectForm";

export default function ProjectLinksList({ projects, formRef, showProjects }: { projects: { rows: Project[], hasMore: boolean }, formRef: React.RefObject<HTMLDialogElement>, showProjects: boolean }) {
    const scrollElement = useRef<HTMLDivElement>(null);
    const editDialog = useRef<HTMLDialogElement>(null);
    const deleteDialog = useRef<HTMLDialogElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project>();
    const { data, isLoading, prependItem, updateItem, deleteItem } = useInfiniteScroll(projects, scrollElement, useCallback((page) => fetch(`http://localhost:3000/api/projects?page=${page}`), []));

    return (
        <>
            <ul className="menu">
                {
                    showProjects && data.rows.map(project => <ProjectLink key={project.id} project={project}
                        onEdit={() => {
                            setSelectedProject(project);
                            editDialog.current?.showModal();
                        }} onDelete={() => {
                            setSelectedProject(project);
                            deleteDialog.current?.showModal();
                        }} />)
                }
                {isLoading && <div className="flex justify-center"><div className="loading loading-spinner"></div></div>}
                <div ref={scrollElement}></div>
            </ul>
            <CreateProjectForm formRef={formRef} onSuccess={prependItem} />
            <EditProjectForm editDialog={editDialog} project={selectedProject} onEdit={updateItem} onCancel={() => {
                setSelectedProject(undefined);
                editDialog.current?.close()
            }} />
            <DeleteProjectForm formRef={deleteDialog} projectId={selectedProject?.id as string} onDelete={deleteItem} />
        </>
    )
}