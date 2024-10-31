/* eslint-disable react/prop-types */
import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";

export const CustomerList = ({ customerList, onDelete, openEdit }) => {
  <table></table>;
  return (
    <>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((val, key) => (
            <tr key={key}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.phone}</td>
              <td>{val.address}</td>
              <td style={{ width: "20px" }}>
                <Container>
                  <Row>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => openEdit(val)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(val)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Row>
                </Container>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {customerList.length === 0 ? (
        <div className="d-grid justify-content-center">
          <p>No Data.</p>
        </div>
      ) : null}
    </>
  );
};
