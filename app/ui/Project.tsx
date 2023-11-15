import Link from "next/link";

export default function Project() {
    return (
        <li>
            <Link href="/" className="flex items-center gap-5 text-sm">
                <div className="h-[10px] w-[10px] rounded-lg bg-green-500"></div>
                <p>Exams</p>
            </Link>
        </li>
    )
}
