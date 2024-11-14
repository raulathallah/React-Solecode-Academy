export const getEmployeeName = (empNo) => {
  let employees = JSON.parse(localStorage.getItem("employees"));

  if (!empNo) {
    return "-";
  }

  let data = employees.find((val) => val.empNo === empNo);

  if (!data) {
    return "DELETED EMPLOYEE";
  }

  return `${data.fName} ${data.lName}`;
};

export const getDepartmentName = (deptNo) => {
  let departments = JSON.parse(localStorage.getItem("departments"));

  if (!deptNo) {
    return "-";
  }

  let data = departments.find((val) => val.deptNo === deptNo);

  if (!data) {
    return "DELETED DEPARTMENT";
  }

  return `${data.deptName}`;
};

export const getProjectName = (projNo) => {
  let projects = JSON.parse(localStorage.getItem("projects"));

  if (!projects) {
    return "-";
  }

  let data = projects.find((val) => val.projNo === projNo);

  if (!data) {
    return "DELETED PROJECT";
  }

  return `${data.projName}`;
};
