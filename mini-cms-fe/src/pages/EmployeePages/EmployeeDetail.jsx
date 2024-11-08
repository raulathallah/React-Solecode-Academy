import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEmployees } from "../../utils/api/Employees";
import { Card, ListGroup } from "react-bootstrap";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { getDepartmentName } from "../../utils/helpers/HelperFunctions";

const initialValue = {
  empNo: 0,
  fName: "",
  lName: "",
  address: "",
  dob: "",
  sex: "",
  position: "",
  deptNo: 0,
};
const EmployeeDetail = () => {
  const { id: empNo } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(initialValue);

  useEffect(() => {
    if (empNo) {
      setEmployeeData(
        getEmployees().find((val) => val.empNo === parseInt(empNo))
      );
    }
  }, [empNo]);

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <Card className="w-50">
      <Card.Header>Employee Detail</Card.Header>
      <Card.Body className="">
        <div className="tw-grid tw-grid-cols-2">
          {/**LEFT */}
          <ListGroup as="ol" className="list-group-flush border-0">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">First Name</div>
                {employeeData.fName}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Sex</div>
                {employeeData.sex}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Department</div>
                {getDepartmentName(employeeData.deptNo)}
              </div>
            </ListGroup.Item>
          </ListGroup>
          {/**RIGHT */}
          <ListGroup as="ol" className="list-group-flush">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Last Name</div>
                {employeeData.lName ? employeeData.lName : "-"}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Address</div>
                {employeeData.address}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Position</div>
                {employeeData.position}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className="d-flex justify-content-end">
          <ButtonCustom variant="secondary" onClick={onCancel}>
            Back
          </ButtonCustom>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default EmployeeDetail;
