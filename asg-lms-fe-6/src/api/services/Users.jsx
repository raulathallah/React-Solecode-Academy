import Api from "../Api";

const getAllUser = async () => {
  try {
    return await Api.get(`/api/users`);
  } catch (err) {
    return err;
  }
};

const getUser = async (id) => {
  try {
    return await Api.get(`/api/users/${id}`);
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, body) => {
  try {
    return await Api.put(`/api/users/${id}`, body);
  } catch (err) {
    return err;
  }
};

const addUser = async (body) => {
  try {
    return await Api.post(`/api/users`, body);
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    return await Api.delete(`/api/users/${id}`);
  } catch (err) {
    return err;
  }
};

export { getAllUser, getUser, updateUser, addUser, deleteUser };
