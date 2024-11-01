import { Col, Container, Row } from "react-bootstrap";

/* eslint-disable react/prop-types */
export const OrderDetail = (props) => {
  const { menu } = props;
  return (
    <div>
      <div className="">
        <Container>
          <Row>
            <Col sm="3">
              <p>Name </p>
            </Col>
            <Col>
              <p className="">: {menu.name}</p>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <p>Price</p>
            </Col>
            <Col>
              <p className="">: {menu.price}</p>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <p>Category </p>
            </Col>
            <Col>
              <p className="">: {menu.category}</p>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <p>Rating </p>
            </Col>
            <Col>
              <p className="">: {menu.rating}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
