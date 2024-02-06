import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ActivityHeader({ date, onCollapse }: { date: string, onCollapse: () => void }) {
    return <button className="flex items-center gap-2 text-xl font-bold">
        <ChevronDownIcon height={30} width={30}/>
        <p>{new Intl.DateTimeFormat("en-PK", { dateStyle: "full" }).format(new Date(date))}</p>
    </button>;
}