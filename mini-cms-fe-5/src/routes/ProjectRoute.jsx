import ProjectDetail from "../pages/ProjectPages/ProjectDetail";
import ProjectForm from "../pages/ProjectPages/ProjectForm";
import Projects from "../pages/ProjectPages/Projects";
import ProjectWorkHistory from "../pages/ProjectPages/ProjectWorkHistory";

const ProjectRoute = [
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/projects/new",
    element: <ProjectForm type={"add"} />,
  },
  {
    path: "/projects/:id",
    element: <ProjectDetail />,
  },
  {
    path: "/projects/:id/history",
    element: <ProjectWorkHistory />,
  },
  {
    path: "/projects/:id/edit",
    element: <ProjectForm type={"edit"} />,
  },
];

export default ProjectRoute;
