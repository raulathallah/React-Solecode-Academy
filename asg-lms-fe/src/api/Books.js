import axios from "axios";

const getAllBook = async (callback, errorcallback, config) => {
  await axios
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

const getBook = async (id, callback, errorcallback, config) => {
  await axios
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

const updateBook = async (id, body, callback, errorcallback, config) => {
  await axios
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

const addBook = async (body, callback, errorcallback, config) => {
  await axios
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

const deleteBook = async (id, callback, errorcallback, config) => {
  await axios
    .delete(`http://localhost/api/books/${id}`, config)
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

export { getAllBook, getBook, updateBook, addBook, deleteBook };
