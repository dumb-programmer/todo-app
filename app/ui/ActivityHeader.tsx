export default function ActivityHeader({ date }: { date: string }) {
    return <h2 className="pr-8">{new Intl.DateTimeFormat("en-PK", { dateStyle: "full" }).format(new Date(date))}</h2>;
}