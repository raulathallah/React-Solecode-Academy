const calculateTotalPrice = (orderList) => {
  let total = 0;
  orderList.map((val) => (total = total + val.price));
  return total;
};

export { calculateTotalPrice };
