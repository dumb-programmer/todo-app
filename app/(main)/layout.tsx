import React from "react";
import SideNav from "../ui/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen flex">
        <SideNav />
        <main className="flex-1 p-20 overflow-y-scroll">
            {children}
        </main>
    </div>
}