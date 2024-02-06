"use client";

import { Activity } from "@prisma/client";
import ActivityHeader from "./ActivityHeader";
import ActivityList from "./ActivityList";
import { useInfiniteScroll } from "@/app/lib/hooks/useInfiniteScroll";
import { useCallback, useRef } from "react";

export default function Activities({ activities }: { activities: { rows: Activity[], hasMore: boolean } }) {
    const scrollElement = useRef<HTMLDivElement>(null);
    const { data, isLoading, prependItem, updateItem, deleteItem } = useInfiniteScroll<Activity>(activities, scrollElement, useCallback((page: number) => {
        const url = new URL("http://localhost:3000/api/activities");
        url.searchParams.set("page", page.toString());
        return fetch(url.toString());
    }, []));

    const groupedActivities = data.rows.reduce((result: { [index: string]: Activity[] }, activity) => {
        const date = new Date(activity.timeStamp).toISOString().split("T")[0]
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

    return <>
        {
            groupedActivitiesArray.map((dailyActivities, index) =>
                <div key={index}>
                    <ActivityHeader date={dailyActivities.date} />
                    <ActivityList activities={dailyActivities.activities} />
                </div>)
        }
        {isLoading && <div className="mt-10 flex justify-center"><div className="loading loading-spinner"></div></div>}
        <div id="more-todos" ref={scrollElement}></div>
    </>
}