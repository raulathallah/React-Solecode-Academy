import axios from "axios";

const getAllUser = async (callback, errorcallback, config) => {
  await axios
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

const getUser = async (id, callback, errorcallback, config) => {
  await axios
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

const updateUser = async (id, body, callback, errorcallback, config) => {
  await axios
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

const addUser = async (body, callback, errorcallback, config) => {
  await axios
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

const deleteUser = async (id, callback, errorcallback, config) => {
  await axios
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
