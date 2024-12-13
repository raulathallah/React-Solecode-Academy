import axios from "axios";

const getEmployeeListReport = async (deptNo) => {
  try {
    return await axios.get(
      `http://localhost:5045/api/v1/Employees/report-pdf/${deptNo}`,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    return err;
  }
};
const getLeaveRequestReport = async (body) => {
  try {
    return await axios.post(
      `http://localhost:5045/api/v1/Company/leave-report-pdf`,
      body,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    return err;
  }
};
const getProjectReport = async () => {
  try {
    return await axios.get(`http://localhost:5045/api/v1/Projects/report-pdf`, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
      withCredentials: true,
    });
  } catch (err) {
    return err;
  }
};

export { getEmployeeListReport, getLeaveRequestReport, getProjectReport };
