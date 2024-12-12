import PrivateRoute from "../components/PrivateRoutes";
import ProjectDetail from "../pages/ProjectPages/ProjectDetail";
import ProjectForm from "../pages/ProjectPages/ProjectForm";
import Projects from "../pages/ProjectPages/Projects";
import ProjectWorkHistory from "../pages/ProjectPages/ProjectWorkHistory";

const ProjectRoute = [
  {
    element: <PrivateRoute allowedRoles={["Administrator", "HR Manager"]} />,
    children: [
      {
        path: "/projects/new",
        element: <ProjectForm type={"add"} />,
      },
      {
        path: "/projects/:id/edit",
        element: <ProjectForm type={"edit"} />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute
        allowedRoles={[
          "Administrator",
          "Employee Supervisor",
          "Employee",
          "Department Manager",
        ]}
      />
    ),
    children: [
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute
        allowedRoles={["Administrator", "Employee Supervisor", "Employee"]}
      />
    ),
    children: [
      {
        path: "/projects/:id",
        element: <ProjectDetail />,
      },
      {
        path: "/projects/:id/history",
        element: <ProjectWorkHistory />,
      },
    ],
  },
];

export default ProjectRoute;
