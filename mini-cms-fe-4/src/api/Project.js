import axios from "axios";

const getProjectPaginate = async (pageNumber, perPage) => {
  try {
    return await axios.get(
      `/api/v1/Projects?pageNumber=${pageNumber}&perPage=${perPage}`
    );
  } catch (err) {
    console.log(err);
  }
};

const getProject = async (projNo) => {
  try {
    return await axios.get(`/api/v1/Projects/${projNo}`);
  } catch (err) {
    console.log(err);
  }
};

const addProject = async (body) => {
  try {
    return await axios.post(`/api/v1/Projects`, body);
  } catch (err) {
    console.log(err);
  }
};

const updateProject = async (projNo, body) => {
  try {
    return await axios.put(`/api/v1/Projects/${projNo}`, body);
  } catch (err) {
    console.log(err);
  }
};

export { getProjectPaginate, getProject, addProject, updateProject };
