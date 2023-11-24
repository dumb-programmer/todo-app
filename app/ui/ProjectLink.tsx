import { TrashIcon } from "@heroicons/react/20/solid";
import { Project } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteProjectButton from "./DeleteProjectButton";

export default function ProjectLink({ project }: { project: Omit<Project, "userId"> }) {
    const path = usePathname();
    const url = `/projects/${project.id}`;

    return (
        <li>
            <Link href={url} className={clsx("flex justify-between gap-5 text-sm", path === url && "active")}>
                <p>{project.name}</p>
                <DeleteProjectButton projectId={project.id} />
            </Link>
        </li>
    )
}
