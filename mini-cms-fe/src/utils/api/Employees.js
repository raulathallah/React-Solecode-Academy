export const getEmployees = () => {
  let employees = JSON.parse(localStorage.getItem("employees"));
  if (!employees) {
    return [];
  }

  return employees;
};

export const generateEmpNo = () => {
  let empNo = parseInt(JSON.parse(localStorage.getItem("empNo")));
  if (!empNo) {
    empNo = 1;

    localStorage.setItem("empNo", empNo);
    return empNo;
  }

  empNo = empNo + 1;
  localStorage.setItem("empNo", empNo);
  return empNo;
};
