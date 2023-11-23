"use client";

import { CalculatorIcon, CalendarDaysIcon, HomeIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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