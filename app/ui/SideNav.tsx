import { getProjects } from "../lib/data";
import NavLinks from "./NavLinks";
import ProjectsPanel from "./ProjectsPanel";

export default async function SideNav() {
    const projects = await getProjects();

    return <aside className="w-1/4 max-w-lg">
        <NavLinks />
        <ProjectsPanel projects={projects} />
    </aside>;
};