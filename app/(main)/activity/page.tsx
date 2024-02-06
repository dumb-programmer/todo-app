import { getActivities } from "@/app/lib/data";
import getUser from "@/app/lib/getUser";
import ActivityHeader from "@/app/ui/activity/ActivityHeader";
import ActivityList from "@/app/ui/activity/ActivityList";
import { Activity } from "@prisma/client";

export default async function Page() {
    const user = await getUser();
    const activities = await getActivities(user.email);

    const groupedActivities = activities.reduce((result: { [index: string]: Activity[] }, activity) => {
        const date = activity.timeStamp.toISOString().split("T")[0]

        if (!result[date]) {
            result[date] = [];
        }

        result[date].push(activity);

        return result;
    }, {});

    const groupedActivitiesArray = Object.entries(groupedActivities).map(([date, activities]) => ({
        date,
        activities,
        isCollapsed: true
    }));


    return <div className="prose flex flex-col gap-8">
        {
            groupedActivitiesArray.map((dailyActivities, index) =>
                <div key={index}>
                    <ActivityHeader date={dailyActivities.date} />
                    <ActivityList activities={dailyActivities.activities} />
                </div>)
        }
    </div>
}