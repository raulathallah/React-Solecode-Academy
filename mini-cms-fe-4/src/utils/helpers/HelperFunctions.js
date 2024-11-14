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

export const getManagerName = (data, empNo) => {
  if (data && empNo) {
    let employee = data.find((x) => x.empno === empNo);
    if (employee) {
      return `${employee.fname} ${employee.lname}`;
    }
  }

  return "-";
};

export const getDepartmentName = (data, deptNo) => {
  if (data && deptNo) {
    let dept = data.find((x) => x.deptno === deptNo);
    if (dept) {
      return `${dept.deptname}`;
    }
  }

  return "-";
};
