import Api from "./Api";

const getProjectPaginate = async (pageNumber, perPage) => {
  try {
    return await Api.get(
      `/api/v1/Projects?pageNumber=${pageNumber}&perPage=${perPage}`
    );
  } catch (err) {
    return err;
  }
};

const getProject = async (projNo) => {
  try {
    return await Api.get(`/api/v1/Projects/${projNo}`);
  } catch (err) {
    return err;
  }
};

const getAllProject = async () => {
  try {
    return await Api.get(`/api/v1/Projects/all`);
  } catch (err) {
    return err;
  }
};

const addProject = async (body) => {
  try {
    return await Api.post(`/api/v1/Projects`, body);
  } catch (err) {
    return err;
  }
};

const updateProject = async (projNo, body) => {
  try {
    return await Api.put(`/api/v1/Projects/${projNo}`, body);
  } catch (err) {
    return err;
  }
};

const deleteProject = async (projNo) => {
  try {
    return await Api.delete(`/api/v1/Projects/${projNo}`);
  } catch (err) {
    return err;
  }
};

export {
  getProjectPaginate,
  getProject,
  addProject,
  updateProject,
  deleteProject,
  getAllProject,
};
