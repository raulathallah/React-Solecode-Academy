/* eslint-disable react/prop-types */
import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";

export const MenuList = ({ menuList, onDelete, openEdit, onOrder }) => {
  return (
    <>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Availablity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuList.map((val, key) => (
            <tr key={key}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.price}</td>
              <td>{val.category}</td>
              <td>{val.rating}</td>
              <td>
                {val.isAvailable == "false" ? "Unavailable" : "Available"}
              </td>
              <td style={{ width: "20px" }}>
                <Container>
                  <Row>
                    <ButtonGroup>
                      {openEdit && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => openEdit(val)}
                        >
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(val)}
                        >
                          Delete
                        </Button>
                      )}
                      {onOrder && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onOrder(val)}
                        >
                          Add
                        </Button>
                      )}
                    </ButtonGroup>
                  </Row>
                </Container>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {menuList.length === 0 ? (
        <div className="d-grid justify-content-center">
          <p>No Data.</p>
        </div>
      ) : null}
    </>
  );
};
