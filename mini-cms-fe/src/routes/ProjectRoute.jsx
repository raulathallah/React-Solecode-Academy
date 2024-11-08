import ProjectForm from "../pages/ProjectPages/ProjectForm";
import Projects from "../pages/ProjectPages/Projects";

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
    element: null,
  },
  {
    path: "/projects/:id/edit",
    element: <ProjectForm type={"edit"} />,
  },
];

export default ProjectRoute;
