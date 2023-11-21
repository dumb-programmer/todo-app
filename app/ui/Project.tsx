import Link from "next/link";

export default function Project({ project }) {
    return (
        <li>
            <Link href={`/projects/${project.id}`} className="flex items-center gap-5 text-sm">
                <div className="h-[10px] w-[10px] rounded-lg bg-green-500"></div>
                <p>{project.name}</p>
            </Link>
        </li>
    )
}
