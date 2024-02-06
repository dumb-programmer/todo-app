import { Activity } from "@prisma/client";
import ActivityItem from "./ActivityItem";

export default function ActivityList({ activities }: { activities: Activity[] }) {
    return activities.map(activity => <ActivityItem key={activity.id} activity={activity} />);
}