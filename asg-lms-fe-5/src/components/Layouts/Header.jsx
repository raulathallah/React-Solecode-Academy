import {
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from "react-bootstrap";
import { options } from "../../utils/DateOptions";
const Header = () => {
  const header = {
    title: "Library Management System",
    dateNow: new Date().toLocaleDateString("id-ID", options),
  };

  let { title: NAMA_WEBSITE, dateNow: WAKTU_SEKARANG } = header;
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="p-4">
      <Navbar.Brand href="/">{NAMA_WEBSITE}</Navbar.Brand>
      <Container>
        <Nav className="me-auto d-flex gap-4">
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Books</Dropdown.Toggle>
            <Dropdown.Menu>
              <Nav.Link href="/books">Books</Nav.Link>
              <Nav.Link href="/transactions" disabled>
                Borrow
              </Nav.Link>
            </Dropdown.Menu>
          </Dropdown>

          <Nav.Link href="/members">Members</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>{WAKTU_SEKARANG}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
