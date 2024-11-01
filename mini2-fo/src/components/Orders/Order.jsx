import { useState } from "react";
import { OrderDetail } from "./OrderDetail";
import { OrderList } from "./OrderList";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { MenuList } from "../Menus/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { calculateTotalPrice } from "../../utils/Calculation";

export const Order = () => {
  const [orderId, setOrderId] = useState(0);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [qty, setQty] = useState(1);
  const [tabKey, setTabKey] = useState("order");
  const menus = [
    {
      id: 1,
      name: "Mie Goreng",
      price: 5000,
      category: "Food",
      rating: 4,
      isAvailable: true,
    },
    {
      id: 2,
      name: "Air Mineral",
      price: 3000,
      category: "Beverage",
      rating: 4.2,
      isAvailable: true,
    },
  ];
  const customers = [
    {
      id: 1,
      name: "Raul",
      email: "raul@mail.com",
      phone: "08299910391",
      address: "Jl. Tangerang Satu",
    },
    {
      id: 2,
      name: "Athallah",
      email: "atha22@mail.com",
      phone: "08293323141",
      address: "Jl. Jakarta Dua",
    },
  ];
  const [customer, setCustomer] = useState(customers[0]);

  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState({
    id: null,
    name: "",
    price: null,
    category: "",
    rating: null,
    isAvailable: false,
    count: 0,
  });
  const [orderedData, setOrderedData] = useState([]);
  const onAddOrder = () => {
    let isOrdered = orders.find((v) => v.id === orderDetail.id);
    if (isOrdered) {
      isOrdered.count = isOrdered.count + qty;
      let addPrice = orderDetail.price * qty;
      isOrdered.price = isOrdered.price + addPrice;
      setOrders([...orders]);
    } else {
      setOrders([
        ...orders,
        { ...orderDetail, count: qty, price: orderDetail.price * qty },
      ]);
    }
    setQty(1);
    setIsOpenOrder(false);
    alert("Order added!");
  };
  const onOrder = (order) => {
    let isOrdered = orders.find((v) => v.id === order.id);
    if (isOrdered) {
      setOrderDetail(isOrdered);
    } else {
      setOrderDetail(order);
    }
    setIsOpenOrder(true);
  };
  const onOpenDetail = (orderedMenu) => {
    let menu = menus.find((val) => val.id === orderedMenu.id);
    setOrderDetail(menu);
    setIsOpenDetail(true);
  };
  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };
  const handleCloseOrder = () => {
    setIsOpenOrder(false);
  };
  const onRemoveOrder = (id) => {
    let removeOrder = orders.filter((val) => val.id !== id);
    setOrders([...removeOrder]);
    alert("Order removed!");
  };
  const onCheckout = () => {
    if (orders.length === 0) {
      alert("Nothing to checkout!");
      return false;
    }
    let newOrderId = orderId + 1;
    setOrderedData([
      ...orderedData,
      {
        orderId: newOrderId,
        orderList: orders,
        orderCustomer: customer,
        orderStatus: "ON PROGRESS",
        totalPrice: calculateTotalPrice(orders),
      },
    ]);
    setOrderId(newOrderId);
    setOrders([]);
    setOrderDetail({
      id: null,
      name: "",
      price: null,
      category: "",
      rating: null,
      isAvailable: false,
      count: 0,
    });
    setTabKey("status");
    setIsOpenOrder(false);
    setIsOpenDetail(false);
    alert("Checkout success!");
  };

  const getStatus = (status) => {
    if (status === "ON PROGRESS")
      return (
        <Badge bg="warning" className="text-black">
          {status}
        </Badge>
      );
    if (status === "DONE") {
      return <Badge bg="success">{status}</Badge>;
    }
    if (status === "CANCEL") {
      return <Badge bg="danger">{status}</Badge>;
    }
  };
  const onDoneOrder = (orderId) => {
    let orderData = orderedData.find((val) => val.orderId === orderId);
    orderData.orderStatus = "DONE";
    setOrderedData([...orderedData]);
    alert("Order Done!");
  };
  const onCancelOrder = (orderId) => {
    let orderData = orderedData.find((val) => val.orderId === orderId);
    orderData.orderStatus = "CANCEL";
    setOrderedData([...orderedData]);
    alert("Order Canceled!");
  };
  const onChangeCustomer = (id) => {
    let orderCustomer = customers.find((val) => val.id === parseInt(id));
    setCustomer(orderCustomer);
  };
  return (
    <div className="">
      <Tabs
        defaultActiveKey={tabKey}
        activeKey={tabKey}
        className="mb-3"
        onSelect={(e) => setTabKey(e)}
      >
        {/** ORDER */}
        <Tab eventKey="order" title="Order">
          <div className="d-flex gap-4">
            <div>
              <div
                className="border p-3 my-2"
                style={{ display: "grid", gap: "10px" }}
              >
                <h3>Menu List</h3>
                <MenuList menuList={menus} onOrder={onOrder} />
              </div>
            </div>

            <div
              style={{ display: "grid", gap: "10px", width: "100%" }}
              className="p-3 border my-2"
            >
              <div className="d-flex justify-content-between align-items-start">
                <h3>Order</h3>
                <Button variant="warning" onClick={onCheckout}>
                  Place Order
                </Button>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <Form.Group as={Row} className="mb-3" controlId="formCategory">
                  <Form.Label column md="8">
                    Select Customer
                  </Form.Label>
                  <Col md="10">
                    <Form.Select
                      required
                      //value={customer.id}
                      onChange={(e) => onChangeCustomer(e.target.value)}
                    >
                      {customers.map((val) => (
                        <option key={val.id} value={val.id}>
                          {val.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
              <OrderList
                orderList={orders}
                onOpenDetail={onOpenDetail}
                onRemoveOrder={onRemoveOrder}
              />
            </div>
          </div>
        </Tab>

        {/** STATUS */}
        <Tab eventKey="status" title="Status">
          <div className="d-flex gap-2">
            <div style={{ display: "grid", gap: "10px" }} className="p-3 my-2">
              <h3>Order Status</h3>
              <div className="d-flex gap-4 flex-wrap">
                {orderedData.map((val) => (
                  <Card style={{ width: "18rem" }} key={val.orderId}>
                    <Card.Body className="">
                      <div className="mb-4">
                        <Card.Title className="d-flex justify-content-between align-items-center">
                          <div>Order {val.orderId}</div>
                        </Card.Title>
                        <Card.Subtitle>
                          <div className="text-muted d-flex align-items-center gap-2">
                            <span>Customer:</span>
                            {val.orderCustomer.name}
                          </div>
                        </Card.Subtitle>
                      </div>

                      {val.orderList.map((orderData) => (
                        <>
                          <Card.Text className="d-flex align-items-center gap-2 mb-0">
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              style={{ fontSize: 12 }}
                            />
                            <span className="d-flex align-items-center justify-content-md-between w-100 gap-2 mb-0">
                              <span className="mb-0">{`${orderData.count}x ${orderData.name}`}</span>
                              <span className="mb-0">{`Rp.${orderData.price}`}</span>
                            </span>
                          </Card.Text>
                        </>
                      ))}
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <Card.Text className="d-flex align-items-end justify-content-between gap-2 mb-0 fw-bold">
                          <span>Total</span>
                          <span>{`Rp.${val.totalPrice}`}</span>
                        </Card.Text>
                      </ListGroup.Item>
                    </ListGroup>

                    <Card.Footer className="d-flex gap-2 align-items-center justify-content-between">
                      {val.orderStatus ? getStatus(val.orderStatus) : null}
                      {val.orderStatus === "ON PROGRESS" && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="danger"
                            size="sm"
                            className=""
                            onClick={() => onCancelOrder(val.orderId)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            className=""
                            onClick={() => onDoneOrder(val.orderId)}
                          >
                            Done
                          </Button>
                        </div>
                      )}
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>

      <Modal
        show={isOpenDetail || isOpenOrder}
        onHide={isOpenDetail ? handleCloseDetail : handleCloseOrder}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderDetail menu={orderDetail} />
          {isOpenOrder && (
            <Container>
              <Form.Group as={Row} className="mb-3" controlId="formPrice">
                <Row>
                  <Form.Label column sm="3">
                    Quantity
                  </Form.Label>
                  <Col sm="4" className="d-flex">
                    <Form.Control
                      type="number"
                      required
                      min={1}
                      value={qty}
                      size="sm"
                      onChange={(e) => setQty(parseInt(e.target.value))}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isOpenOrder ? (
            <>
              <Button variant="danger" onClick={handleCloseOrder}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onAddOrder}>
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button variant="danger" onClick={handleCloseDetail}>
                Close
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
