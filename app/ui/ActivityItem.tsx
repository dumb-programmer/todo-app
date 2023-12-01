import { CheckIcon, FolderIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Activity, ActivityType } from '@prisma/client'

function getIcon(type: ActivityType) {
    switch (type) {
        case "CREATE":
            return <PlusIcon height={12} color="white" />;
        case "EDIT":
            return <PencilIcon height={12} color="white" />;
        case "DELETE":
            return <TrashIcon height={12} color="white" />;
        case "DONE":
            return <CheckIcon height={12} color="white" />;
    }
}

export default function ActivityItem({ activity }: { activity: Activity }) {
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4 relative">
                <div className="flex justify-center bg-gray-600 p-2 rounded-2xl after:h-full after:w-0.5 after:block after:absolute after:bg-gray-400 after:-z-10">
                    <span>{getIcon(activity.type)}</span>
                </div>
                <span>{new Intl.DateTimeFormat("en-PK", { hour: "numeric", minute: "numeric", second: "numeric" }).format(activity.timeStamp)}</span>
                <p>{activity.description}</p>
            </div>
            {
                activity.projectName && <span className="flex items-center gap-2">
                    <FolderIcon height={20} />
                    <p>{activity.projectName}</p>
                </span>
            }
        </div>
    )
}