import { getActivities } from "@/app/lib/data";
import getUser from "@/app/lib/getUser";
import Activities from "@/app/ui/activity/Activities";
import ActivityHeader from "@/app/ui/activity/ActivityHeader";
import ActivityList from "@/app/ui/activity/ActivityList";
import { Activity } from "@prisma/client";

export default async function Page() {
    const user = await getUser();
    const activities = await getActivities(user.email);

    return <div className="prose flex flex-col gap-8">
        <Activities activities={activities}/>
    </div>
}