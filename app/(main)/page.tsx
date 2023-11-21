import { PlusIcon } from "@heroicons/react/20/solid";
import Todo from "../ui/Todo";

export default async function Home() {
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="font-bold text-3xl">Today</h1>
        <p>{new Date().toLocaleDateString("en-PK", { day: "numeric", month: "long" })}</p>
        <div className="mt-10 flex flex-col gap-10">
          <Todo />
        </div>
        <div className="mt-10 flex gap-5">
          <button className="btn btn-xs"><PlusIcon height={20} /></button>
          <p className="text-gray-500">Add task</p>
        </div>
      </div>
    </div>
  )
}
