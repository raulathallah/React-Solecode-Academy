import { Container, Nav, Navbar } from "react-bootstrap";
import { options } from "../../utils/DateOptions";
const Header = () => {
  const header = {
    title: "Library Management System",
    dateNow: new Date().toLocaleDateString("id-ID", options),
  };

  let { title: NAMA_WEBSITE, dateNow: WAKTU_SEKARANG } = header;

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="p-4">
      <Container>
        <Navbar.Brand href="#home">{NAMA_WEBSITE}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/books">Books</Nav.Link>
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
