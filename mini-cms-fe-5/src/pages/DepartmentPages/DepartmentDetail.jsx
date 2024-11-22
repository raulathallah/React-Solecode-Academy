import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Container,
  ListGroup,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHistory,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { getAllDepartment, getDepartment } from "../../api/Department";
import {
  getDepartmentName,
  getEmployeeName,
} from "../../utils/helpers/HelperFunctions";
import Loading from "../../components/Elements/Loading";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllEmployees } from "../../api/Fetchs/FetchEmployees";

const initialValue = {
  deptno: null,
  deptname: "",
  mgrempno: null,
  location: [],
};

const locations = [
  {
    id: 1,
    name: "Jakarta",
  },
  {
    id: 2,
    name: "Bandung",
  },
  {
    id: 3,
    name: "Surabaya",
  },
];

const DepartmentDetail = () => {
  const { id: deptNo } = useParams();
  const navigate = useNavigate();

  const [departmentData, setDepartmentData] = useState(initialValue);
  const [listDeptEmployee, setListDeptEmployee] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDepartment().then((res) => {
      if (res.status === 200) {
        setListDepartment(res.data);
      }
    });
  }, []);

  const {
    data: listE,
    isLoading: isLoadingE,
    //isError: isErrorE,
    //error: errorE,
  } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => fetchAllEmployees(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (listE) {
      setListEmployee(listE);
      setListDeptEmployee(listE.filter((e) => e.deptno === parseInt(deptNo)));
    }
  }, [listE]);
  console.log(departmentData);
  useEffect(() => {
    if (deptNo) {
      getDepartment(deptNo)
        .then((res) => {
          if (res.status === 200) {
            setDepartmentData(res.data);
          }
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false);
          }, 1500)
        );
    }
  }, [deptNo]);

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  if (loading && isLoadingE) {
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
          <Card.Header>Department Detail</Card.Header>
          <Card.Body className="tw-grid tw-gap-10">
            <div className="tw-grid tw-grid-cols-2">
              {/**LEFT */}
              <ListGroup as="ol" className="list-group-flush border-0">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Department Number</div>
                    {departmentData.deptno}
                  </div>
                </ListGroup.Item>{" "}
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Department Name</div>
                    {departmentData.deptname}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Department Manager</div>
                    {departmentData.mgrempno
                      ? getEmployeeName(listEmployee, departmentData.mgrempno)
                      : "-"}
                  </div>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup as="ol" className="list-group-flush border-0">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Locations</div>
                    <div className="tw-grid tw-grid-cols-4 tw-gap-0">
                      {departmentData.location &&
                        departmentData.location.map((x) => (
                          <h5 key={x}>
                            <Badge bg="info">
                              {x
                                ? locations.find((loc) => loc.id === x)?.name
                                : ""}
                            </Badge>
                          </h5>
                        ))}
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
        <Card className="">
          <Card.Header>Employee in Department</Card.Header>
          <Card.Body>
            {listDeptEmployee.length !== 0 ? (
              <>
                <Table striped bordered hover responsive="sm">
                  <thead>
                    <tr>
                      <th>Employee Number</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listDeptEmployee.map((val, key) => (
                      <tr key={key}>
                        <td>{val.empno}</td>
                        <td>{`${val.fname} ${val.lname}`}</td>
                        <td>{getDepartmentName(listDepartment, val.deptno)}</td>
                        <td>{val.emailAddress}</td>
                        <td style={{ width: "20px" }}>
                          <Container>
                            <Row>
                              <ButtonGroup aria-label="Basic example">
                                <OverlayTrigger
                                  overlay={<Tooltip>Details</Tooltip>}
                                >
                                  <Button
                                    as={Link}
                                    variant="dark"
                                    to={`/employees/${val.empno}`}
                                  >
                                    <FontAwesomeIcon icon={faList} />
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  overlay={<Tooltip>Work History</Tooltip>}
                                >
                                  <Button
                                    as={Link}
                                    variant="secondary"
                                    to={`/employees/${val.empno}/history`}
                                  >
                                    <FontAwesomeIcon icon={faHistory} />
                                  </Button>
                                </OverlayTrigger>
                              </ButtonGroup>
                            </Row>
                          </Container>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <p className="text-center tw-text-gray-400">Employee Empty</p>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default DepartmentDetail;
