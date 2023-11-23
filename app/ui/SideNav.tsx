import { getProjects } from "../lib/data";
import NavLinks from "./NavLinks";
import ProjectsPanel from "./ProjectsPanel";

export default async function SideNav() {
    const projects = await getProjects();

    return <aside className="h-screen w-1/4 max-w-lg bg-gray-50">
        <NavLinks />
        <ProjectsPanel projects={projects} />
    </aside>;
};