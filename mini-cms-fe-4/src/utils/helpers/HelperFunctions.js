export const getEmployeeName = (data, empNo) => {
  if (data && empNo) {
    let employee = data.find((x) => x.empno === empNo);
    if (employee) {
      return `${employee.fname} ${employee.lname}`;
    }
  }

  return "-";
};

export const getProjectName = (data, projNo) => {
  if (data && projNo) {
    let project = data.find((x) => x.projno === projNo);
    if (project) {
      return `${project.projname}`;
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
