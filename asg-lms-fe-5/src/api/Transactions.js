import axios from "axios";

const borrowBook = async (body, callback, errorcallback, config) => {
  await axios
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

const returnBook = async (body, callback, errorcallback, config) => {
  await axios
    .post(`http://localhost/api/transactions/return`, body, config)
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

const getAllBorrow = async (callback, errorcallback, config) => {
  await axios
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

export { borrowBook, getAllBorrow, returnBook };
