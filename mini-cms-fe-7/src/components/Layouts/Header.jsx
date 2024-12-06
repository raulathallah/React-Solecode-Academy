import { Container, Nav, Navbar } from "react-bootstrap";
import { options } from "../../utils/DateOptions";
import { useSelector } from "react-redux";

const menuItems = [
  {
    label: "Employees",
    path: "/employees",
    visibleForRoles: [
      "Administrator",
      "HR Manager",
      "Employee Supervisor",
      "Employee",
    ],
  },
  {
    label: "Departments",
    path: "/departments",
    visibleForRoles: [
      "Administrator",
      "Department Manager",
      "Employee Supervisor",
    ],
  },
  {
    label: "Projects",
    path: "/projects",
    visibleForRoles: [
      "Administrator",
      "Department Manager",
      "Employee",
      "Employee Supervisor",
    ],
  },
  {
    label: "Assignments",
    path: "/assignments",
    visibleForRoles: [
      "Administrator",
      "Employee",
      "Employee Supervisor",
      "HR Manager",
    ],
  },
  {
    label: "Leave Request",
    path: "/leave-request",
    visibleForRoles: ["Administrator", "Employee Supervisor", "HR Manager"],
  },
  {
    label: "My Leave Request",
    path: "/leave-request/list",
    visibleForRoles: ["Administrator", "Employee"],
  },
  {
    label: "Make an account",
    path: "/register",
    visibleForRoles: ["Administrator"],
  },
];

const authMenuItems = [
  {
    label: "Login",
    path: "/login",
    isAuthenticated: false,
  },
  {
    label: "Profile",
    path: "/profile",
    visibleForRoles: [
      "Administrator",
      "Department Manager",
      "HR Manager",
      "Employee",
      "Employee Supervisor",
    ],
  },
];

const Header = () => {
  const header = {
    title: "CMS",
    dateNow: new Date().toLocaleDateString("en-US", options),
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  const isMenuVisible = (item) => {
    // Selalu tampilkan menu untuk semua user
    if (item.visibleForAll) return true;

    //jika user belum login, tampilkan menu yang isAuthenticated false
    if (item.isAuthenticated == false && !currentUser) {
      return true;
    }

    //jika user sudah login, tampilkan logout
    if (item.label == "Logout" && currentUser) {
      return true;
    }

    // Cek role untuk menu spesifik
    if (item.visibleForRoles && currentUser?.roles) {
      return item.visibleForRoles.some((role) =>
        currentUser.roles.includes(role)
      );
    }

    return false;
  };

  let { title: NAMA_WEBSITE } = header;
  return (
    <Navbar className="p-3 tw-shadow-md">
      <Container>
        <Navbar.Brand href="/" className="tw-font-bold">
          {NAMA_WEBSITE}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="tw-gap-5">
            {menuItems.filter(isMenuVisible).map((item, index) => (
              <Nav.Link key={index} href={item.path}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end gap-4">
          {/** <Navbar.Text>{WAKTU_SEKARANG}</Navbar.Text>*/}
          <Nav>
            {authMenuItems.filter(isMenuVisible).map((item, index) => (
              <Nav.Link key={index} href={item.path}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <Navbar.Text className="fw-bold">
            {currentUser && currentUser.roles[0]}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
