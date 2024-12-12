import {
  getAllEmployee,
  getEmployee,
  getEmployeePaginate,
  getEmployeePaginateSearch,
  getLeaveRequest,
  getLeaveRequestPaginate,
} from "../Employee";

const fetchEmployeeDetail = async ({ id }) => {
  const { data } = await getEmployee(id);
  return data;
};

const fetchEmployees = async ({ page, pageSize }) => {
  const { data } = await getEmployeePaginate(page + 1, pageSize);
  return data;
};

const fetchEmployeeSearch = async ({ page, pageSize, searchQuery }) => {
  const { data } = await getEmployeePaginateSearch(
    {
      pageNumber: page + 1,
      perPage: pageSize,
    },
    searchQuery
  );

  return data;
};

const fetchAllEmployees = async () => {
  const { data } = await getAllEmployee();
  return data;
};

const fetchLeaveRequestPaginate = async ({ page, pageSize, searchQuery }) => {
  const { data } = await getLeaveRequestPaginate(
    {
      pageNumber: page + 1,
      perPage: pageSize,
    },
    searchQuery
  );
  return data;
};

const fetchLeaveRequest = async ({ id }) => {
  const { data } = await getLeaveRequest(id);
  return data;
};
export {
  fetchEmployeeDetail,
  fetchEmployees,
  fetchAllEmployees,
  fetchEmployeeSearch,
  fetchLeaveRequestPaginate,
  fetchLeaveRequest,
};
