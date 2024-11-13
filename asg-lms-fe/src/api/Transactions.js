import axios from "axios";

const borrowBook = (body, callback, errorcallback, config) => {
  axios
    .post(`http://localhost/api/transactions/borrow`, body, config)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
const getAllBorrow = (callback, errorcallback, config) => {
  axios
    .get(`http://localhost/api/transactions`, config)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};

export { borrowBook, getAllBorrow };
