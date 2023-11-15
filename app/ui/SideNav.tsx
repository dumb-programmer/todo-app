"use client";

import { CalculatorIcon, CalendarDaysIcon, ChevronDownIcon, HomeIcon, PlusIcon } from "@heroicons/react/20/solid"
import clsx from "clsx";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useRef } from "react";
import CreateProjectForm from "./CreateProjectForm";
import Project from "./Project";

const navigationLinks = [
    {
        label: "Home",
        href: "/",
        icon: <HomeIcon height={20} />
    },
    {
        label: "Today",
        href: "/today",
        icon: <CalendarDaysIcon height={20} />
    },
    {
        label: "Upcoming",
        href: "/upcoming",
        icon: <CalculatorIcon height={20} />
    },
]

export default function SideNav() {
    const pathname = usePathname();
    const formRef = useRef<HTMLDialogElement>();

    return <aside className="h-screen w-1/4 max-w-lg bg-gray-50">
        <nav className="mt-20">
            <ul className="menu">
                {
                    navigationLinks.map((link, index) => <li className={clsx(pathname === link.href && "active")} key={index}><Link className="flex items-center" href={link.href}>{link.icon} {link.label}</Link></li>)
                }
            </ul>
        </nav>
        <div className="px-7 mt-10">
            <div className="flex justify-between">
                <h2 className="font-bold">Projects</h2>
                <div className="flex gap-5">
                    <button className="btn btn-sm" onClick={() => formRef?.current?.showModal()}><PlusIcon height={20} /></button>
                    <button className="btn btn-sm"><ChevronDownIcon height={20} /></button>
                </div>
            </div>
            <ul className="menu">
                <Project />
            </ul>
        </div>
        <CreateProjectForm formRef={formRef} />
    </aside>;
};