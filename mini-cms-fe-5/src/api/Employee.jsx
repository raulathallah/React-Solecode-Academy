import Api from "./Api";

const getEmployeePaginate = async (pageNumber, perPage) => {
  try {
    const res = await Api.get(
      `/api/v1/Employees?pageNumber=${pageNumber}&perPage=${perPage}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

const getEmployeePaginateSearch = async (body, searchParams) => {
  try {
    return await Api.post(`/api/v1/Employees/search`, body, {
      params: searchParams,
    });
  } catch (err) {
    return err;
  }
};

const getEmployee = async (empNo) => {
  try {
    return await Api.get(`/api/v1/Employees/${empNo}`);
  } catch (err) {
    return err;
  }
};

const getAllEmployee = async () => {
  try {
    return await Api.get(`/api/v1/Employees/all`);
  } catch (err) {
    return err;
  }
};

const addEmployee = async (body) => {
  try {
    return await Api.post(`/api/v1/Employees`, body);
  } catch (err) {
    return err;
  }
};

const updateEmployee = async (empNo, body) => {
  try {
    return await Api.put(`/api/v1/Employees/${empNo}`, body);
  } catch (err) {
    return err;
  }
};

const deleteEmployee = async (empNo) => {
  try {
    return await Api.delete(`/api/v1/Employees/${empNo}`);
  } catch (err) {
    return err;
  }
};

const deactivateEmployee = async (empNo, body) => {
  try {
    return await Api.put(`/api/v1/Employees/${empNo}/deactivate`, body);
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
  getEmployeePaginateSearch,
  deactivateEmployee,
};
