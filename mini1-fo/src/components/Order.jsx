import { useState } from "react";

export const Order = () => {
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
    price: 0,
    category: "",
    rating: 0,
    isAvailable: false,
  });
  const onOrder = (order) => {
    let isOrdered = orders.find((v) => v.id === order.id);
    console.log(isOrdered);
    if (isOrdered) {
      isOrdered.count = isOrdered.count + 1;
      setOrders([...orders]);
    } else {
      setOrders([...orders, { ...order, count: 1 }]);
    }
    alert("Order added!");
  };
  const onOpenDetail = (menu) => {
    setOrderDetail(menu);
  };

  return (
    <div className="content-container">
      <div>
        <h3>Menu List</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Availablity</th>
            <th>Action</th>
          </tr>
          {menus.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.price}</td>
              <td>{val.category}</td>
              <td>{val.rating}</td>
              <td>{!val.isAvailable ? "Unavailable" : "Available"}</td>
              <td className="bl-action">
                <button className="button-table" onClick={() => onOrder(val)}>
                  Order
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <h3>Order List</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Count</th>
            <th>Action</th>
          </tr>
          {orders.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.price}</td>
              <td>{val.count}</td>
              <td>
                <button
                  className="button-table"
                  onClick={(val) => onOpenDetail(val)}
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ width: "200px" }}>
        <h3>Order Detail</h3>
        <p>Name: {orderDetail.name}</p>
      </div>
    </div>
  );
};
