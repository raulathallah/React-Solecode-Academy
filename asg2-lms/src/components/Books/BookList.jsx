/* eslint-disable react/prop-types */
import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";

export const BookList = ({ bookList, onDelete, openEdit }) => {
  return (
    <>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Year</th>
            <th>ISBN</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((val, key) => (
            <tr key={key}>
              <td>{val.id}</td>
              <td>{val.title}</td>
              <td>{val.author}</td>
              <td>{val.category}</td>
              <td>{val.year}</td>
              <td>{val.isbn}</td>
              <td style={{ width: "20px" }}>
                <Container>
                  <Row>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openEdit(val)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => onDelete(val.id)}
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

      {bookList.length === 0 ? (
        <div className="d-grid justify-content-center">
          <p>No Data.</p>
        </div>
      ) : null}
    </>
  );
};
