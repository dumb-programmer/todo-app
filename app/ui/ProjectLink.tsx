import { Project } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";

export default function ProjectLink({ project, onEdit, onDelete }: { project: Project, onEdit: (project: Project) => void, onDelete: (id: string) => void }) {
    const path = usePathname();
    const url = `/projects/${project.id}`;

    return (
        <li>
            <Link href={url} className={clsx("flex justify-between gap-5 text-sm", path === url && "active")}>
                <p>{project.name}</p>
                <div className="flex gap-2">
                    <EditProjectButton project={project} onEdit={onEdit} />
                    <DeleteProjectButton projectId={project.id} onDelete={onDelete} />
                </div>
            </Link>
        </li>
    )
}
