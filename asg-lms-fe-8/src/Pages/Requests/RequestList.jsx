import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllRequestListPaged } from "../../api/services/Transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Elements/Loading";
import ReactPaginate from "react-paginate";

const fetchRequestListPaged = async ({ page, pageSize, sortQuery }) => {
  const { data } = await getAllRequestListPaged(
    {
      pageNumber: page + 1,
      perPage: pageSize,
    },
    sortQuery
  );

  return data;
};
const initialSortValue = {
  sortBy: "status",
  sortOrder: "asc",
};
const sortParamList = [
  "Requester",
  "Title",
  "Author",
  "ISBN",
  "Publisher",
  "Status",
];

const RequestList = () => {
  const [list, setList] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [sortQuery, setSortQuery] = useState(initialSortValue);

  const { data, isLoading } = useQuery({
    queryKey: ["requestListPaged", page, pageSize, sortQuery],
    queryFn: () => fetchRequestListPaged({ page, pageSize, sortQuery }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setList(data.data.filter((val) => val.isDeleted !== true));
      setPageCount(Math.ceil(data.total / pageSize));
    }
  }, [data, page, pageSize]);

  const getStatus = (status) => {
    let bg = "";
    if (status === "Librarian Review Request") {
      bg = "warning";
    }

    if (status === "Library Manager Review Request") {
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

  return (
    <Card>
      <Card.Header>Request List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Form.Label className="mx-2">Sort By</Form.Label>
            <Form.Select
              style={{ width: "100px" }}
              value={sortQuery.sortBy}
              size="sm"
              onChange={(e) => {
                setSortQuery({ ...sortQuery, sortBy: e.target.value });
              }}
            >
              {sortParamList.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Form.Select>

            <Form.Label className="mx-2">Sort Order</Form.Label>
            <Form.Select
              style={{ width: "150px" }}
              size="sm"
              value={sortQuery.sortOrder}
              onChange={(e) => {
                setSortQuery({ ...sortQuery, sortOrder: e.target.value });
              }}
            >
              <option value="asc">Ascending</option>
              <option value="dsc">Descending</option>
            </Form.Select>
          </div>

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
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              {/* <th style={{ width: "5%" }}>No.</th> */}
              <th>Request Date</th>
              <th>Requester</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Isbn</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((val, key) => (
                <tr key={key}>
                  {/* <td>{getTableNumber(itemOffset, itemsPerPage, key)}</td> */}
                  <td>{val.requestDate}</td>
                  <td>{val.requesterName}</td>
                  <td>{val.title}</td>
                  <td>{val.author}</td>
                  <td>{val.publisher}</td>
                  <td>{val.isbn}</td>
                  <td>{getStatus(val.status)}</td>
                  <td style={{ width: "20px" }}>
                    <Container className="d-flex gap-2">
                      <Button
                        as={Link}
                        variant="dark"
                        size="sm"
                        to={`/request/${val.bookRequestId}/detail`}
                      >
                        Detail
                      </Button>
                      {val.status !== "Request Rejected" && (
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/request/${val.bookRequestId}`}
                        >
                          Review
                        </Button>
                      )}
                    </Container>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< prev"
          containerClassName="pagination align-items-center gap-3"
          pageClassName="text-black"
          pageLinkClassName="py-2 px-3 rounded text-decoration-none text-black"
          previousLinkClassName="page-num text-decoration-none text-black"
          nextLinkClassName="page-num text-decoration-none text-black"
          activeLinkClassName="text-white bg-primary"
        />
      </Card.Body>
    </Card>
  );
};

export default RequestList;
