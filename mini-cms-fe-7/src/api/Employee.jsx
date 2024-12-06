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

const assignEmployee = async (empNo, body) => {
  try {
    return await Api.put(`/api/v1/Employees/${empNo}/assign`, body);
  } catch (err) {
    return err;
  }
};

const getLeaveRequestPaginate = async (body, searchParams) => {
  try {
    return await Api.post(`/api/v1/Employees/leave/list`, body, {
      params: searchParams,
    });
  } catch (err) {
    return err;
  }
};

const getLeaveRequest = async (id) => {
  try {
    return await Api.get(`/api/v1/Employees/leave/${id}`);
  } catch (err) {
    return err;
  }
};

const leaveRequest = async (body) => {
  try {
    return await Api.post("/api/v1/Employees/leave", body);
  } catch (err) {
    return err;
  }
};

const leaveRequestUpload = async (formData) => {
  try {
    return await Api.post("/api/v1/Employees/leave/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    return err;
  }
};

const leaveRequestApproval = async (body) => {
  try {
    return await Api.post(`/api/v1/Employees/leave-approval`, body);
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
  assignEmployee,
  getLeaveRequestPaginate,
  leaveRequest,
  getLeaveRequest,
  leaveRequestApproval,
  leaveRequestUpload,
};
