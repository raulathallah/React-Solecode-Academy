export const getDepartments = () => {
  let departments = JSON.parse(localStorage.getItem("departments"));
  if (!departments) {
    return [];
  }

  return departments;
};

export const generateDeptNo = () => {
  let deptNo = parseInt(JSON.parse(localStorage.getItem("deptNo")));
  if (!deptNo) {
    deptNo = 1;

    localStorage.setItem("deptNo", deptNo);
    return deptNo;
  }

  deptNo = deptNo + 1;
  localStorage.setItem("deptNo", deptNo);
  return deptNo;
};
