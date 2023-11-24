import { Project } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";

export default function ProjectLink({ project }: { project: Omit<Project, "userId"> }) {
    const path = usePathname();
    const url = `/projects/${project.id}`;

    return (
        <li>
            <Link href={url} className={clsx("flex justify-between gap-5 text-sm", path === url && "active")}>
                <p>{project.name}</p>
                <div className="flex gap-2">
                    <EditProjectButton project={project} />
                    <DeleteProjectButton projectId={project.id} />
                </div>
            </Link>
        </li>
    )
}
