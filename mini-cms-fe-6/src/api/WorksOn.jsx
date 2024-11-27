import Api from "./Api";

const getWorksOnPaginate = async (pageNumber, perPage) => {
  try {
    return await Api.get(
      `/api/v1/Workson?pageNumber=${pageNumber}&perPage=${perPage}`
    );
  } catch (err) {
    return err;
  }
};

const getWorksOn = async (projNo, empNo) => {
  try {
    return await Api.get(`/api/v1/Workson/${projNo}/${empNo}`);
  } catch (err) {
    return err;
  }
};

const getAllWorksOn = async () => {
  try {
    return await Api.get(`/api/v1/Workson/all`);
  } catch (err) {
    return err;
  }
};

const addWorksOn = async (body) => {
  try {
    return await Api.post(`/api/v1/Workson`, body);
  } catch (err) {
    return err;
  }
};

const updateWorksOn = async (projNo, empNo, body) => {
  try {
    return await Api.put(`/api/v1/Workson/${projNo}/${empNo}`, body);
  } catch (err) {
    return err;
  }
};

const deleteWorksOn = async (projNo, empNo) => {
  try {
    return await Api.delete(`/api/v1/Workson/${projNo}/${empNo}`);
  } catch (err) {
    return err;
  }
};

export {
  getWorksOnPaginate,
  getWorksOn,
  getAllWorksOn,
  addWorksOn,
  updateWorksOn,
  deleteWorksOn,
};
