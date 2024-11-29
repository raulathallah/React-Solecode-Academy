import { Container, Nav, Navbar } from "react-bootstrap";
import { options } from "../../utils/DateOptions";
import { useSelector } from "react-redux";
//import { logout, reset } from "../../api/slices/authSlice";

const menuItems = [
  {
    label: "Profil",
    path: "/profile",
    visibleForRoles: ["Librarian", "Library Manager", "Library User"],
  },
  {
    label: "Books",
    path: "/books",
    visibleForRoles: ["Librarian"],
  },
  {
    label: "Users",
    path: "/members",
    visibleForRoles: ["Library Manager"],
  },
  {
    label: "Search",
    path: "/books/search",
    visibleForRoles: ["Librarian", "Library User"],
  },
];

const authMenuItems = [
  {
    label: "Login",
    path: "/login",
    isAuthenticated: false,
  },
  {
    label: "Register",
    path: "/register",
    isAuthenticated: false,
  },
];

const Header = () => {
  const header = {
    title: "Library Management System",
    dateNow: new Date().toLocaleDateString("id-ID", options),
  };

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

  const { user: currentUser } = useSelector((state) => state.auth);

  let { title: NAMA_WEBSITE, dateNow: WAKTU_SEKARANG } = header;
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="p-4">
      <Navbar.Brand href="/">{NAMA_WEBSITE}</Navbar.Brand>
      <Container>
        <Nav className="me-auto d-flex gap-4">
          {menuItems.filter(isMenuVisible).map((item, index) => (
            <Nav.Link key={index} href={item.path}>
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
        <Navbar.Collapse className="justify-content-end gap-4">
          <Navbar.Text>{WAKTU_SEKARANG}</Navbar.Text>

          <Nav>
            {authMenuItems.filter(isMenuVisible).map((item, index) => (
              <Nav.Link key={index} href={item.path}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
