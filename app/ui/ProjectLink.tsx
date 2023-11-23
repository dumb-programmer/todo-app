import { Project } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProjectLink({ project }: { project: Omit<Project, "userId"> }) {
    const path = usePathname();
    const url = `/projects/${project.id}`;

    return (
        <li>
            <Link href={url} className={clsx("flex items-center gap-5 text-sm", path === url && "active")}>
                <p>{project.name}</p>
            </Link>
        </li>
    )
}
