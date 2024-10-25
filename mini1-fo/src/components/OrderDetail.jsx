/* eslint-disable react/prop-types */
export const OrderDetail = (props) => {
  const { menu } = props;

  return (
    <div style={{ width: "200px" }}>
      <h3>Order Detail</h3>
      <div className="o-detail">
        <p>Name </p>
        <p className="o-detail-text">: {menu.name}</p>
        <p>
          Price <span style={{ fontSize: "12px" }}>/item</span>{" "}
        </p>
        <p className="o-detail-text">: {menu.price}</p>
        <p>Category </p>
        <p className="o-detail-text">: {menu.category}</p>
        <p>Rating </p>
        <p className="o-detail-text">: {menu.rating}</p>
        <p>Count </p>
        <p className="o-detail-text">: {menu.count}</p>
      </div>
    </div>
  );
};
