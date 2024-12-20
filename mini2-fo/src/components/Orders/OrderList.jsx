/* eslint-disable react/prop-types */
import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";
import { calculateTotalPrice } from "../../utils/Calculation";

export const OrderList = ({ orderList, onOpenDetail, onRemoveOrder }) => {
  return (
    <>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((val, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{val.name}</td>
              <td>{val.count}</td>
              <td>{val.price}</td>
              <td style={{ width: "20px" }}>
                <Container>
                  <Row>
                    <ButtonGroup>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onOpenDetail(val)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onRemoveOrder(val.id)}
                      >
                        Remove
                      </Button>
                    </ButtonGroup>
                  </Row>
                </Container>
              </td>
            </tr>
          ))}

          {orderList.length !== 0 && (
            <tr>
              <td className="fw-bold" colSpan={3}>
                Total
              </td>
              <td className="fw-bold" colSpan={2}>
                {calculateTotalPrice(orderList)}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {orderList.length === 0 ? (
        <div className="d-grid justify-content-center">
          <p>No Data.</p>
        </div>
      ) : null}
    </>
  );
};
