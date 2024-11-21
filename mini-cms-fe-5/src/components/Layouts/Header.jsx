import { Container, Nav, Navbar } from "react-bootstrap";
import { options } from "../../utils/DateOptions";

const Header = () => {
  const header = {
    title: "CMS",
    dateNow: new Date().toLocaleDateString("en-US", options),
  };

  let { title: NAMA_WEBSITE, dateNow: WAKTU_SEKARANG } = header;
  return (
    <Navbar className="p-3 tw-shadow-md">
      <Container>
        <Navbar.Brand href="/" className="tw-font-bold">
          {NAMA_WEBSITE}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="tw-gap-5">
            <Nav.Link href="/employees" className="hover:tw-underline">
              Employees
            </Nav.Link>
            <Nav.Link href="/departments" className="hover:tw-underline">
              Departments
            </Nav.Link>
            <Nav.Link href="/projects" className="hover:tw-underline">
              Projects
            </Nav.Link>
            <Nav.Link href="/assignments" className="hover:tw-underline">
              Assignments
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>{WAKTU_SEKARANG}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
