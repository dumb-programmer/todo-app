"use client";

import { PencilIcon } from "@heroicons/react/20/solid";


export default function EditTodoButton({ onClick }: { onClick: () => void }) {
    return <button className="btn btn-xs" onClick={(e) => {
        e.preventDefault();
        onClick();
    }}>
        <PencilIcon height={15} />
    </button>;
}