import axios from "axios";

const getAllUser = (callback, errorcallback, config) => {
  axios
    .get(`http://localhost/api/users`, config)
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

const getUser = (id, callback, errorcallback, config) => {
  axios
    .get(`http://localhost/api/users/${id}`, config)
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

const updateUser = (id, body, callback, errorcallback, config) => {
  axios
    .put(`http://localhost/api/users/${id}`, body, config)
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

const addUser = (body, callback, errorcallback, config) => {
  axios
    .post(`http://localhost/api/users`, body, config)
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

const deleteUser = (id, callback, errorcallback, config) => {
  axios
    .delete(`http://localhost/api/users/${id}`, config)
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

export { getAllUser, getUser, updateUser, addUser, deleteUser };
