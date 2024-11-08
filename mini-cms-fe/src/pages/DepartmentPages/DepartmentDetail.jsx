import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDepartments } from "../../utils/api/Departments";
import { getEmployees } from "../../utils/api/Employees";

const initialValue = {
  deptNo: 0,
  deptName: "",
  mgrEmpNo: 0,
};

const DepartmentDetail = () => {
  const { id: deptNo } = useParams();

  const [departmentData, setDepartmentData] = useState(initialValue);
  const [listEmployee, setListEmployee] = useState([]);

  useEffect(() => {
    if (deptNo) {
      setDepartmentData(
        getDepartments().find((val) => val.deptNo === parseInt(deptNo))
      );
      setListEmployee(
        getEmployees().filter((val) => val.deptNo === parseInt(deptNo))
      );
    }
  }, [deptNo]);

  return (
    <div>
      <p>Dept No: {departmentData.deptNo}</p>
      <p>Dept Name: {departmentData.deptName}</p>
      <p>Manager: {departmentData.mgrEmpNo}</p>

      <div>
        <h6>Employee List</h6>
        {listEmployee.map((val) => (
          <div key={val.empNo}>
            <ul>
              <li>
                Name : {val.fName}, {val.lName}
              </li>
              <li>Department : {val.deptNo}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentDetail;
