/* eslint-disable react/prop-types */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchLeaveRequestPaginate } from "../../api/Fetchs/FetchEmployees";
import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading";
import ReactPaginate from "react-paginate";
import {
  Badge,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Link } from "react-router-dom";
import ButtonCustom from "../../components/Elements/ButtonCustom";
const initialSearchValue = {
  keyword: "",
};

const LeaveRequest = ({ type }) => {
  const [list, setList] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(initialSearchValue);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employeesSearch", page, pageSize, searchQuery],
    queryFn: () => fetchLeaveRequestPaginate({ page, pageSize, searchQuery }),
    placeholderData: keepPreviousData,
  });

  //const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data) {
      setList(data.data);
      setPageCount(Math.ceil(data.total / pageSize));
    }
  }, [data, page, pageSize]);

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

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <p>Error... {error.message}</p>;
  }

  const getStatus = (status) => {
    if (!status) {
      return "-";
    }

    let bg = "";
    if (status === "Under Supervisor Review") {
      bg = "warning";
    }
    if (status === "Under HR Review") {
      bg = "info";
    }
    if (status === "Request Approved") {
      bg = "success";
    }
    if (status === "Request Rejected") {
      bg = "danger";
    }
    return <Badge bg={bg}>{status}</Badge>;
  };
  return (
    <Card>
      <Card.Header>Leave Request List</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div className="tw-flex">
          <ButtonCustom
            icon={<FontAwesomeIcon icon={faPlus} />}
            as={Link}
            to={"/leave-request/add"}
            size="sm"
          >
            Request Leave
          </ButtonCustom>
        </div>

        <div className="tw-flex tw-justify-between">
          <InputGroup className="w-75">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Search..."
              value={searchQuery.keyword}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, keyword: e.target.value })
              }
            />
          </InputGroup>

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
        <div className="tw-flex tw-justify-between gap-2"></div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>No.</th>
              <th>Employee Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Leave Type</th>
              <th>Reason</th>
              <th>File</th>
              <th>Current Status</th>
              <th>Submission Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{page * pageSize + key + 1}</td>
                <td>{val.employeeName}</td>
                <td>
                  {val.startDate
                    ? moment(val.startDate).format("LL")
                    : "(null)"}
                </td>
                <td>
                  {val.endDate ? moment(val.endDate).format("LL") : "(null)"}
                </td>
                <td>{val.totalDays}</td>
                <td>{val.leaveType}</td>
                <td>{val.reason}</td>
                <td style={{ width: "7%" }}>
                  {val.file ? (
                    <Button
                      as={Link}
                      variant="primary"
                      size="sm"
                      target="_blank"
                      to={`http://localhost:5045/file/${val.file}`}
                    >
                      Open File
                    </Button>
                  ) : (
                    "-"
                  )}
                </td>
                <td>{getStatus(val.status)}</td>
                <td>
                  {val.requestDate
                    ? moment(val.requestDate).format("LL")
                    : "(null)"}
                </td>
                <td style={{ width: "100px" }}>
                  <Container className="d-flex gap-2">
                    <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                      <Button
                        as={Link}
                        variant="dark"
                        size="sm"
                        to={`/leave-request/${val.leaveRequestId}`}
                      >
                        <FontAwesomeIcon icon={faList} />
                      </Button>
                    </OverlayTrigger>
                    {val.status && val.status.includes("Under") && !type && (
                      <OverlayTrigger overlay={<Tooltip>Review</Tooltip>}>
                        <Button
                          as={Link}
                          size="sm"
                          variant="primary"
                          to={`/leave-request/${val.leaveRequestId}/review`}
                        >
                          <FontAwesomeIcon icon={faSearch} />
                        </Button>
                      </OverlayTrigger>
                    )}
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

export default LeaveRequest;
