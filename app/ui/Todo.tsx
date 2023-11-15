import { CalendarIcon } from "@heroicons/react/20/solid";

export default function Todo() {
    return <div className="flex gap-5">
        <div className="mt-5">
            <input className="checkbox checkbox-primary rounded-3xl" type="checkbox" />
        </div>
        <div>
            <h2 className="text-lg">Study for Exam</h2>
            <p className="text-gray-500 text-xs mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores amet possimus hic perferendis vero animi dignissimos accusamus magni quas quia.</p>
            <div className="flex gap-2 text-xs mt-2 text-red-600">
                <CalendarIcon height={15} color="red" />
                <p>15 July</p>
            </div>
        </div>
    </div>;
}