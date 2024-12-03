/* eslint-disable react/prop-types */
import {
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
import Loading from "../../components/Elements/Loading";
import { deleteUser, getAllUser } from "../../api/services/Users";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import ErrorMessage from "../../utils/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTableNumber } from "../../utils/HelperFunctions";

const fetchUsers = async () => {
  const { data } = await getAllUser();
  return data;
};

const MemberList = () => {
  const [list, setList] = useState([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  //ON TRY DELETE
  const onTryDelete = (user) => {
    Swal.fire({
      title: `Are you sure want to delete user?`,
      text: `${user.fName} ${user.lName} with ID ${user.userId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(user.userId);
      }
    });
  };
  //DELETE MEMBER
  const onDelete = (id) => {
    deleteUser(id).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Member deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        if (res.message) {
          ErrorMessage(res.message);
        }
      }
    });
  };

  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemsPerPage, itemOffset, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return ErrorMessage(error.message);
  }

  return (
    <Card>
      <Card.Header>Member List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" as={Link} to={"/members/add"}>
            Add Member
          </Button>
          <div className="d-flex gap-3">
            <Form.Label>Items/page</Form.Label>
            <Form.Select
              type="text"
              value={itemsPerPage}
              size="sm"
              onChange={(e) => setItemsPerPage(e.target.value)}
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
              <th style={{ width: "5%" }}>No.</th>
              <th>Name</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((val, key) => (
                <tr key={key}>
                  <td>{getTableNumber(itemOffset, itemsPerPage, key)}</td>
                  <td>{val.fName + " " + val.lName}</td>
                  <td>{val.userPosition}</td>
                  <td style={{ width: "20px" }}>
                    <Container>
                      <Row>
                        <ButtonGroup aria-label="Basic example">
                          <Button
                            as={Link}
                            variant="dark"
                            size="sm"
                            to={`/members/${val.userId}`}
                          >
                            Details
                          </Button>
                          <Button
                            as={Link}
                            variant="primary"
                            size="sm"
                            to={`/members/${val.userId}/edit`}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onTryDelete(val)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Row>
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

export default MemberList;
