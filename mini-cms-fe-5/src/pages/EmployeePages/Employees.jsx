import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Elements/Loading";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFlag,
  faHistory,
  faList,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { deactivateEmployee, deleteEmployee } from "../../api/Employee";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchEmployeeSearch } from "../../api/Fetchs/FetchEmployees";
import moment from "moment";
import { getEmpStatus, getEmpType } from "../../utils/helpers/HelperFunctions";

const searchByList = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "dept",
    label: "Department",
  },
  {
    value: "position",
    label: "Position",
  },
  {
    value: "level",
    label: "Level",
  },
  {
    value: "type",
    label: "Type",
  },
];

const sortByList = [
  ...searchByList,
  {
    value: "updateDate",
    label: "Last Updated Date",
  },
];

const empTypeList = ["Contract", "Permanent"];

const initialSearchValue = {
  searchBy: "name",
  keyword: "",
  sortBy: "name",
  isDescending: false,
  isActive: null,
};

const Employees = () => {
  const [list, setList] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(initialSearchValue);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employeesSearch", page, pageSize, searchQuery],
    queryFn: () => fetchEmployeeSearch({ page, pageSize, searchQuery }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setList(data.data);
      setPageCount(Math.ceil(data.total / pageSize));
    }
  }, [data, page, pageSize]);

  const onTryDelete = (empNo) => {
    Swal.fire({
      title: `Are you sure want to delete Employee?`,
      text: `Employee Number: ${empNo}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton: "btn btn-primary",
        denyButton: "btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(empNo);
      }
    });
  };

  const onTryChangeStatus = (emp) => {
    Swal.fire({
      title: `Deactivate Employee`,
      text: `${emp.empno} - ${emp.name}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Submit",
      inputLabel: "Reason",
      input: emp.isActive ? "text" : null,
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton: "btn btn-primary",
        denyButton: "btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (!result.value && emp.isActive) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error!",
            text: "Deactivate reason must be filled!",
            showConfirmButton: true,
          });
        }

        const body = {
          deactivateReason: result.value,
        };
        console.log(body);
        onUpdateStatus(emp, body);
      }
    });
  };

  // UPDATE STATUS
  const onUpdateStatus = (emp, body) => {
    if (emp && body) {
      deactivateEmployee(emp.empno, body)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Employee status changed!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
    }
  };

  //DELETE EMPLOYEE
  const onDelete = (empNo) => {
    deleteEmployee(empNo)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  };

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const onChangePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(0);
  };

  console.log({ searchQuery });

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <p>Error... {error.message}</p>;
  }

  return (
    <Card>
      <Card.Header>Employee List</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div className="tw-flex tw-justify-between">
          <ButtonCustom
            icon={<FontAwesomeIcon icon={faPlus} />}
            as={Link}
            to={"/employees/new"}
            size="sm"
          >
            Add Employee
          </ButtonCustom>
          <div className="d-flex gap-1">
            <Form.Select
              type="text"
              value={pageSize}
              size="sm"
              onChange={onChangePageSize}
            >
              <option key={5} value={5}>
                5
              </option>
              <option key={10} value={10}>
                10
              </option>
              <option key={20} value={20}>
                20
              </option>
            </Form.Select>
            <Form.Label style={{ width: "100px" }}>/page</Form.Label>
          </div>
        </div>

        <div className="tw-flex tw-justify-between gap-2">
          <InputGroup className="w-50" size="sm">
            <Form.Select
              value={searchQuery.searchBy}
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  searchBy: e.target.value,
                  keyword: "",
                })
              }
            >
              {searchByList.map((val) => (
                <option key={val.value} value={val.value}>
                  {val.label}
                </option>
              ))}
            </Form.Select>

            {searchQuery.searchBy !== "type" ? (
              <Form.Control
                className="w-50"
                type="text"
                value={searchQuery.keyword}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, keyword: e.target.value })
                }
              />
            ) : (
              <Form.Select
                className="w-50"
                value={searchQuery.keyword}
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    keyword: e.target.value,
                  })
                }
              >
                <option value={""} hidden disabled />
                {empTypeList.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
            )}
          </InputGroup>

          <div className="tw-flex tw-justify-end tw-gap-2 w-50">
            <InputGroup size="sm">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Sort By
              </InputGroup.Text>
              <Form.Select
                value={searchQuery.sortBy}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, sortBy: e.target.value })
                }
              >
                {sortByList.map((val) => (
                  <option key={val.value} value={val.value}>
                    {val.label}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Select
              size="sm"
              value={searchQuery.isDescending}
              onChange={(e) => {
                let bool = false;
                if (e.target.value === "true") {
                  bool = true;
                }
                setSearchQuery({ ...searchQuery, isDescending: bool });
              }}
            >
              <option key={1} value={false}>
                Ascending
              </option>
              <option key={2} value={true}>
                Descending
              </option>
            </Form.Select>
            <Form.Select
              size="sm"
              value={searchQuery.isActive}
              onChange={(e) => {
                let bool = null;
                if (e.target.value === "true") {
                  bool = true;
                }
                if (e.target.value === "false") {
                  bool = false;
                }
                setSearchQuery({ ...searchQuery, isActive: bool });
              }}
            >
              <option key={1} value={null}>
                All Employee
              </option>
              <option key={2} value={true}>
                Active Employee
              </option>
              <option key={3} value={false}>
                Inactive Employee
              </option>
            </Form.Select>
          </div>
        </div>

        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>No.</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Job Position</th>
              <th>Level</th>
              <th>Type</th>
              <th>Last Updated</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{page * pageSize + key + 1}</td>
                <td>{val.name}</td>
                <td>{val.departement ? val.departement : "(null)"}</td>
                <td>{val.position}</td>
                <td>{val.empLevel}</td>
                <td>{getEmpType(val.empType)}</td>
                <td>
                  {val.updateAt ? moment(val.updateAt).format("LLL") : "(null)"}
                </td>
                <td>{getEmpStatus(val.isActive)}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
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
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/employees/${val.empno}/edit`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={<Tooltip>Change Status</Tooltip>}
                        >
                          <Button
                            variant="warning"
                            onClick={() => onTryChangeStatus(val)}
                          >
                            <FontAwesomeIcon icon={faFlag} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="danger"
                            onClick={() => onTryDelete(val.empno)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
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

        <div className="tw-flex tw-justify-center">
          <ReactPaginate
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< prev"
            nextLabel="next >"
            containerClassName="pagination align-items-center gap-3"
            pageClassName="text-black"
            pageLinkClassName="py-2 px-3 rounded text-decoration-none text-black"
            previousLinkClassName="page-num text-decoration-none text-black"
            nextLinkClassName="page-num text-decoration-none text-black"
            activeLinkClassName="text-white bg-primary"
          />
        </div>
      </Card.Body>
    </Card>
  );
};
export default Employees;
