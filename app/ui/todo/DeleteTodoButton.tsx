"use client";

import { TrashIcon } from "@heroicons/react/20/solid";

export default function DeleteTodoButton({ onClick }: { onClick: () => void }) {
    return <button className="btn btn-xs" onClick={(e) => {
        e.preventDefault();
        onClick();
    }}>
        <TrashIcon height={15} color="red" />
    </button>
}