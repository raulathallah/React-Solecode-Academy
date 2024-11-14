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
import { deleteBook, getAllBook } from "../../api/Books";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import ErrorMessage from "../../utils/ErrorMessage";

const BookList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //ON TRY DELETE
  const onTryDelete = (book) => {
    Swal.fire({
      title: `Are you sure want to delete book?`,
      text: `${book.title} by ${book.author}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(book.bookid);
      }
    });
  };

  //DELETE BOOK
  const onDelete = (id) => {
    deleteBook(
      id,
      (res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Book deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            getAllBook(
              (res) => {
                setList(res.data);
              },
              (err) => {
                ErrorMessage(err.message);
              }
            );
          }, 1500);
        }
      },
      (err) => {
        ErrorMessage(err.message);
      }
    );
  };

  //GET BOOKS
  useEffect(() => {
    getAllBook(
      (res) => {
        setList(res.data);
      },
      (err) => {
        ErrorMessage(err.message);
      }
    );
  }, []);

  //SET LOADING STATE
  useEffect(() => {
    if (list) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [list]);

  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(list);
    if (list) {
      setCurrentItems(list.slice(itemOffset, endOffset));
    }
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemsPerPage, itemOffset, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  return (
    <Card>
      <Card.Header>Book List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" as={Link} to={"/books/add"}>
            Add Book
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

        {loading ? (
          <Loading />
        ) : (
          <>
            <Table striped bordered hover responsive="sm">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>No.</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((val, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.title}</td>
                    <td>{val.author}</td>
                    <td style={{ width: "20px" }}>
                      <Container>
                        <Row>
                          <ButtonGroup aria-label="Basic example">
                            <Button
                              as={Link}
                              variant="dark"
                              size="sm"
                              to={`/books/${val.bookid}`}
                            >
                              Details
                            </Button>
                            <Button
                              as={Link}
                              variant="primary"
                              size="sm"
                              to={`/books/${val.bookid}/edit`}
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
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookList;
