import { Api } from "./Api";

const getDepartmentPaginate = async (pageNumber, perPage) => {
  try {
    return await Api.get(
      `/api/v1/Departements?pageNumber=${pageNumber}&perPage=${perPage}`
    );
  } catch (err) {
    return err;
  }
};

const getDepartment = async (deptNo) => {
  try {
    return await Api.get(`/api/v1/Departements/${deptNo}`);
  } catch (err) {
    return err;
  }
};

const getAllDepartment = async () => {
  try {
    return await Api.get(`/api/v1/Departements/all`);
  } catch (err) {
    return err;
  }
};

const addDepartment = async (body) => {
  try {
    return await Api.post(`/api/v1/Departements`, body);
  } catch (err) {
    return err;
  }
};

const updateDepartment = async (deptNo, body) => {
  try {
    return await Api.put(`/api/v1/Departements/${deptNo}`, body);
  } catch (err) {
    return err;
  }
};

const deleteDepartment = async (deptNo) => {
  try {
    return await Api.delete(`/api/v1/Departements/${deptNo}`);
  } catch (err) {
    return err;
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
