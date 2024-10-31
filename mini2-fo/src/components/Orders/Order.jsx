import { useState } from "react";
import { OrderDetail } from "./OrderDetail";
import { OrderList } from "./OrderList";
import { Button, Modal } from "react-bootstrap";
import { MenuList } from "../Menus/MenuList";

export const Order = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
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
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState({
    id: null,
    name: "",
    price: null,
    category: "",
    rating: null,
    isAvailable: false,
    count: null,
  });
  const onOrder = (order) => {
    let isOrdered = orders.find((v) => v.id === order.id);
    console.log(isOrdered);
    if (isOrdered) {
      isOrdered.count = isOrdered.count + 1;
      isOrdered.price = isOrdered.price + order.price;
      setOrders([...orders]);
    } else {
      setOrders([...orders, { ...order, count: 1 }]);
    }
    alert("Order added!");
  };

  const onOpenDetail = (menu) => {
    setOrderDetail(menu);
    setIsOpenDetail(true);
  };
  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };
  return (
    <div className="d-flex gap-4">
      <div>
        <div className="border p-3 my-2">
          <h3>Menu List</h3>
          <MenuList menuList={menus} onOrder={onOrder} />
        </div>
      </div>
      <div className="d-flex gap-2">
        <div
          style={{ display: "grid", gap: "10px" }}
          className="p-3 border my-2"
        >
          <div>
            <h3>Order List</h3>
          </div>
          <OrderList orderList={orders} onOpenDetail={onOpenDetail} />
        </div>
      </div>

      <Modal show={isOpenDetail} onHide={handleCloseDetail} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderDetail menu={orderDetail} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseDetail}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
