import axios from "axios";

const getWorksOnPaginate = async (pageNumber, perPage) => {
  try {
    return await axios.get(
      `/api/v1/Workson?pageNumber=${pageNumber}&perPage=${perPage}`
    );
  } catch (err) {
    console.log(err);
  }
};

const getWorksOn = async (projNo, empNo) => {
  try {
    return await axios.get(`/api/v1/Workson/${projNo}/${empNo}`);
  } catch (err) {
    console.log(err);
  }
};

const getAllWorksOn = async () => {
  try {
    return await axios.get(`/api/v1/Workson/all`);
  } catch (err) {
    console.log(err);
  }
};

const addWorksOn = async (body) => {
  try {
    return await axios.post(`/api/v1/Workson`, body);
  } catch (err) {
    console.log(err);
  }
};

const updateWorksOn = async (projNo, empNo, body) => {
  try {
    return await axios.put(`/api/v1/Workson/${projNo}/${empNo}`, body);
  } catch (err) {
    console.log(err);
  }
};

const deleteWorksOn = async (projNo, empNo) => {
  try {
    return await axios.delete(`/api/v1/Workson/${projNo}/${empNo}`);
  } catch (err) {
    console.log(err);
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
