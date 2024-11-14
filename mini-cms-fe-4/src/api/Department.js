import axios from "axios";

const getDepartmentPaginate = async (pageNumber, perPage) => {
  try {
    return await axios.get(
      `/api/v1/Departements?pageNumber=${pageNumber}&perPage=${perPage}`
    );
  } catch (err) {
    console.log(err);
  }
};

const getDepartment = async (deptNo) => {
  try {
    return await axios.get(`/api/v1/Departements/${deptNo}`);
  } catch (err) {
    console.log(err);
  }
};

const getAllDepartment = async () => {
  try {
    return await axios.get(`/api/v1/Departements/all`);
  } catch (err) {
    console.log(err);
  }
};

const addDepartment = async (body) => {
  try {
    return await axios.post(`/api/v1/Departements`, body);
  } catch (err) {
    console.log(err);
  }
};

const updateDepartment = async (deptNo, body) => {
  try {
    return await axios.put(`/api/v1/Departements/${deptNo}`, body);
  } catch (err) {
    console.log(err);
  }
};

const deleteDepartment = async (deptNo) => {
  try {
    return await axios.delete(`/api/v1/Departements/${deptNo}`);
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllDepartment,
  getDepartmentPaginate,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
