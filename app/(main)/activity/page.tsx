import { getActivities } from "@/app/lib/data";
import ActivityHeader from "@/app/ui/ActivityHeader";
import ActivityList from "@/app/ui/ActivityList";
import { Activity } from "@prisma/client";

export default async function Page() {
    const activities = await getActivities();

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
    }));


    return <div className="prose">
        <h1>Activity</h1>
        {
            groupedActivitiesArray.map((dailyActivities, index) =>
                <div key={index}>
                    <ActivityHeader date={dailyActivities.date} />
                    <ActivityList activities={dailyActivities.activities} />
                </div>)
        }
    </div>
}