import { Badge } from "react-bootstrap";

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

export const getEmpType = (empType) => {
  if (empType === "Permanent") return <Badge bg="primary">{empType}</Badge>;
  if (empType === "Contract") return <Badge bg="success">{empType}</Badge>;

  return "-";
};

export const getEmpStatus = (status) => {
  if (status === true) return <Badge bg="success">Active</Badge>;
  if (status === false) return <Badge bg="danger">Inactive</Badge>;

  return "-";
};
