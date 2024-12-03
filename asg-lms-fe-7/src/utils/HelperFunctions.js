const getTableNumber = (page, pageSize, index) => {
  return page * pageSize + index + 1;
};

export { getTableNumber };
