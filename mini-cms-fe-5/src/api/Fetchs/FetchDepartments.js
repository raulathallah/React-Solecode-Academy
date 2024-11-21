import { getAllDepartment } from "../Department";

const fetchAllDepartments = async () => {
  const { data } = await getAllDepartment();
  return data;
};

export { fetchAllDepartments };
