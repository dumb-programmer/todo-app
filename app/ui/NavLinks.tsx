"use client";

import { CalendarDaysIcon, MegaphoneIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationLinks = [
    {
        label: "Today",
        href: "/",
        icon: <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="currentColor" fillRule="evenodd">
                <path fillRule="nonzero" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"></path>
                <text fontSize="9" transform="translate(4 2)" fontWeight="500">
                    <tspan x="8" y="15" textAnchor="middle">
                        {new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(new Date())}
                    </tspan>
                </text>
            </g></svg>
    },
    {
        label: "Upcoming",
        href: "/upcoming",
        icon: <CalendarDaysIcon height={18} />
    },
    {
        label: "Activity",
        href: "/activity",
        icon: <MegaphoneIcon height={18} />
    }
]

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="mt-20">
            <ul className="menu">
                {
                    navigationLinks.map((link, index) => <li key={index}><Link className={clsx("flex items-center", pathname === link.href && "active")} href={link.href}>{link.icon} {link.label}</Link></li>)
                }
            </ul>
        </nav>
    )
}