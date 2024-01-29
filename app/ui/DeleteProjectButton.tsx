"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";


export default function DeleteProjectButton({ onDelete }: { onDelete: () => void }) {

    return <button className="btn btn-xs" onClick={(e) => {
        e.preventDefault();
        onDelete();
    }}>
        <TrashIcon height={12} color="red" />
    </button>
}