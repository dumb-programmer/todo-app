"use client";

import { PencilIcon } from "@heroicons/react/20/solid";

export default function EditProjectButton({ onClick }: { onClick: () => void }) {
    return <button className="btn btn-xs" onClick={(e) => {
        e.preventDefault();
        onClick();
    }}>
        <PencilIcon height={12} />
    </button>
}