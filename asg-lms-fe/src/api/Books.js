import axios from "axios";

const getAllBook = (callback, errorcallback, config) => {
  axios
    .get(`http://localhost/api/books`, config)
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

const getBook = (id, callback, errorcallback, config) => {
  axios
    .get(`http://localhost/api/books/${id}`, config)
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

const updateBook = (id, body, callback, errorcallback, config) => {
  axios
    .put(`http://localhost/api/books/${id}`, body, config)
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

const addBook = (body, callback, errorcallback, config) => {
  axios
    .post(`http://localhost/api/books`, body, config)
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

export { getAllBook, getBook, updateBook, addBook };
