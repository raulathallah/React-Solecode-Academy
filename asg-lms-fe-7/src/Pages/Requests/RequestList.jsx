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
import { getAllRequestList } from "../../api/services/Transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Elements/Loading";

const fetchRequestList = async () => {
  const { data } = await getAllRequestList();
  return data;
};

const RequestList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["requestList"],
    queryFn: () => fetchRequestList(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const [list, setList] = useState([]);
  const getStatus = (status) => {
    let bg = "";
    if (status === "Librarian Review Borrow Request") {
      bg = "warning";
    }

    if (status === "Library Manager Review Borrow Request") {
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card>
      <Card.Header>Request List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* <Button variant="primary" as={Link} to={"/request/add"}>
            Book Request
          </Button> */}
          <div className="d-flex gap-3">
            <Form.Label>Items/page</Form.Label>
            <Form.Select
              type="text"
              //value={itemsPerPage}
              size="sm"
              //onChange={(e) => setItemsPerPage(e.target.value)}
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
                    {val.status !== "Request Rejected" && (
                      <Container>
                        <Row>
                          <ButtonGroup aria-label="">
                            <Button
                              as={Link}
                              variant="primary"
                              size="sm"
                              to={`/request/${val.bookRequestId}`}
                            >
                              Review
                            </Button>
                          </ButtonGroup>
                        </Row>
                      </Container>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {/* 
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
        /> */}
      </Card.Body>
    </Card>
  );
};

export default RequestList;
