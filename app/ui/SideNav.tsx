import { getProjects } from "../lib/data";
import NavLinks from "./NavLinks";
import ProjectsPanel from "./project/ProjectsPanel";
import ThemeSwitcher from "./ThemeSwitcher";

export default async function SideNav() {
    const projects = await getProjects();

    return <aside className="w-1/4 max-w-lg relative bg-base-200">
        <NavLinks />
        <ProjectsPanel projects={projects} />
        <ThemeSwitcher />
    </aside>;
};