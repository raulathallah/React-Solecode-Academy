import {
  getAllEmployee,
  getEmployee,
  getEmployeePaginate,
  getEmployeePaginateSearch,
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

export {
  fetchEmployeeDetail,
  fetchEmployees,
  fetchAllEmployees,
  fetchEmployeeSearch,
};
