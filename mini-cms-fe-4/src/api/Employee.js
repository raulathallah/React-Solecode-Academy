import axios from "axios";

const getEmployeePaginate = async (pageNumber, perPage) => {
  try {
    const res = await axios.get(
      `/api/v1/Employees?pageNumber=${pageNumber}&perPage=${perPage}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

const getEmployee = async (empNo) => {
  try {
    return await axios.get(`/api/v1/Employees/${empNo}`);
  } catch (err) {
    return err;
  }
};

const getAllEmployee = async () => {
  try {
    return await axios.get(`/api/v1/Employees/all`);
  } catch (err) {
    return err;
  }
};

const addEmployee = async (body) => {
  try {
    return await axios.post(`/api/v1/Employees`, body);
  } catch (err) {
    return err;
  }
};

const updateEmployee = async (empNo, body) => {
  try {
    return await axios.put(`/api/v1/Employees/${empNo}`, body);
  } catch (err) {
    return err;
  }
};

const deleteEmployee = async (empNo) => {
  try {
    return await axios.delete(`/api/v1/Employees/${empNo}`);
  } catch (err) {
    return err;
  }
};

export {
  getEmployeePaginate,
  getAllEmployee,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
