import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Table } from "react-bootstrap";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { getEmployee } from "../../api/Employee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TextDetail from "../../components/Elements/TextDetail";
import { getDepartment } from "../../api/Department";
import Loading from "../../components/Elements/Loading";

const initialValue = {
  fname: "",
  lname: "",
  address: "",
  phoneNumber: "",
  emailAddress: "",
  position: "",
  directSupervisor: null,
  empType: "",
  createdAt: "",
  updatedAt: null,
  empDependents: [],
  empno: null,
  dob: "",
  deactivateReason: null,
  sex: "",
  ssn: "",
  salary: 0,
  isActive: true,
  deptno: null,
};

const initialValueDept = {
  deptno: null,
  deptname: "",
  mgrempno: null,
  locationId: [],
};

const EmployeeDetail = () => {
  const { id: empNo } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(initialValue);
  const [departmentData, setDepartmentData] = useState(initialValueDept);
  const [supervisor, setSupervisor] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployee(empNo)
      .then((res) => {
        if (res.status === 200) {
          setEmployeeData(res.data);
        }
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1500)
      );
  }, [empNo]);

  useEffect(() => {
    if (employeeData) {
      if (employeeData.deptno) {
        getDepartment(employeeData.deptno).then((res) => {
          if (res.status === 200) {
            setDepartmentData(res.data);
          }
        });
      }

      if (employeeData.directSupervisor) {
        getEmployee(employeeData.directSupervisor).then((res) => {
          if (res.status === 200) {
            let name = res.data.fname + " " + res.data.lname;
            setSupervisor(name);
          }
        });
      }
    }
  }, [employeeData]);

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="d-flex mb-2">
        <ButtonCustom
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          variant="secondary"
          onClick={onCancel}
        >
          Back
        </ButtonCustom>
      </div>
      <div className="d-grid gap-3">
        <Card className="">
          <Card.Header>Employee Detail</Card.Header>

          <div className="d-flex gap-2">
            <Card.Body>
              <Card.Subtitle className="mb-2 fw-bold">
                Employee Information
              </Card.Subtitle>
              <hr />
              <div className="tw-grid gap-2">
                <TextDetail label={"Emp Number"}>
                  {employeeData.empno}
                </TextDetail>
                <TextDetail
                  label={"Name"}
                >{`${employeeData.fname} ${employeeData.lname}`}</TextDetail>
                <TextDetail label={"Email"}>
                  {employeeData.emailAddress}
                </TextDetail>
                <TextDetail label={"Phone"}>
                  {employeeData.phoneNumber}
                </TextDetail>
                <TextDetail label={"Address"}>
                  {employeeData.address}
                </TextDetail>
                <TextDetail label={"Sex"}>{employeeData.sex}</TextDetail>
                <TextDetail label={"Date of Birth"}>
                  {employeeData.dob}
                </TextDetail>
                <TextDetail label={"Emp Type"}>
                  {employeeData.empType}
                </TextDetail>
                <TextDetail label={"SSN"}>{employeeData.ssn}</TextDetail>
                <TextDetail label={"Salary"}>{employeeData.salary}</TextDetail>
              </div>
            </Card.Body>
            <Card.Body>
              <Card.Subtitle className="mb-2 fw-bold">
                Department Information
              </Card.Subtitle>
              <hr />
              <div className="tw-grid gap-2">
                <TextDetail label={"Deptartment"}>
                  {departmentData.deptname}
                </TextDetail>
                <TextDetail label={"Position"}>
                  {employeeData.position}
                </TextDetail>
                <TextDetail label={"Direct Supervisor"}>
                  {supervisor}
                </TextDetail>
              </div>
            </Card.Body>
          </div>
        </Card>
        <Card className="">
          <Card.Header>Employee Dependants</Card.Header>
          <Card.Body>
            {employeeData.empDependents.length !== 0 ? (
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>First</th>
                    <th>Last</th>
                    <th>Sex</th>
                    <th>Birth Date</th>
                    <th>Relation</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.empDependents.map((val, key) => (
                    <tr key={key}>
                      <td>{val.fname}</td>
                      <td>{val.lname}</td>
                      <td>{val.sex}</td>
                      <td>{val.birthDate}</td>
                      <td>{val.relation}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center tw-text-gray-400">Dependants Empty</p>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default EmployeeDetail;
