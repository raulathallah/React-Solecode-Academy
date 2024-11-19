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
import { deleteBook, getAllBook, getAllBookSearchPaged } from "../../api/Books";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import ErrorMessage from "../../utils/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchBooks = async ({ page, pageSize, searchQuery }) => {
  const { data } = await getAllBookSearchPaged(
    {
      pageNumber: page + 1,
      perPage: pageSize,
    },
    searchQuery
  );

  return data;
};

const searchParamList = ["Title", "Author", "ISBN", "Category"];
const searchAndOrList = ["and", "or"];
const BookList = () => {
  const [list, setList] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [paramsKey1, setParamsKey1] = useState("title");
  const [paramsKey2, setParamsKey2] = useState("");
  const [paramsKey3, setParamsKey3] = useState("");
  const [paramsKey4, setParamsKey4] = useState("");

  const [searchQuery, setSearchQuery] = useState({
    andor1: "",
    andor2: "",
    andor3: "",
    title: "",
    isbn: "",
    author: "",
    category: "",
    sortBy: "title",
    sortOrder: "asc",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", page, pageSize, searchQuery],
    queryFn: () => fetchBooks({ page, pageSize, searchQuery }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    <p>ERROR!!!</p>;
  }

  useEffect(() => {
    if (data) {
      setList(data.data);
      setPageCount(Math.ceil(data.total / pageSize));
    }
  }, [data, page, pageSize]);
  console.log(list);

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
            getAllBook().then((res) => {
              if (res.status === 200) {
                setList(res.data);
              } else {
                ErrorMessage(res.message);
              }
            });
          }, 1500);
        }
      },
      (err) => {
        ErrorMessage(err.message);
      }
    );
  };

  //GET BOOKS
  // useEffect(() => {
  //   getAllBook().then((res) => {
  //     if (res.status === 200) {
  //       setList(res.data);
  //     } else {
  //       ErrorMessage(res.message);
  //     }
  //   });
  // }, []);

  // const [itemOffset, setItemOffset] = useState(0);
  // const [currentItems, setCurrentItems] = useState(null);
  // const [itemsPerPage, setItemsPerPage] = useState(5);

  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   if (data) {
  //     setCurrentItems(data.slice(itemOffset, endOffset));
  //   }
  // }, [itemsPerPage, itemOffset, list]);
  const handlePageClick = (event) => {
    //const newOffset = (event.selected * itemsPerPage) % list.length;
    //setItemOffset(newOffset);
    setPage(event.selected);
  };

  const onChangePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (searchQuery.andor1 === "") {
      setSearchQuery({ ...searchQuery, [paramsKey2]: "", andor2: "" });
      setParamsKey2("");
    }
  }, [searchQuery.andor1]);

  useEffect(() => {
    if (searchQuery.andor2 === "") {
      setSearchQuery({ ...searchQuery, [paramsKey3]: "", andor3: "" });
      setParamsKey3("");
    }
  }, [searchQuery.andor2]);

  return (
    <>
      <Card>
        <Card.Header>Book List</Card.Header>
        <Card.Body className="d-grid gap-3">
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" as={Link} to={"/books/add"}>
              Add Book
            </Button>
            <div className="d-flex gap-1">
              <Form.Select
                type="text"
                value={pageSize}
                size="sm"
                onChange={onChangePageSize}
              >
                <option key={1} value={1}>
                  1
                </option>
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

          <div>
            <label htmlFor="" className="mx-2">
              search ===
            </label>
            <div id="search1">
              {/**SELECT */}
              <select
                style={{ width: "100px" }}
                value={paramsKey1}
                onChange={(e) => {
                  setParamsKey1(e.target.value);
                }}
              >
                {searchParamList.map((val) => (
                  <option key={val} value={val.toLowerCase()}>
                    {val}
                  </option>
                ))}
              </select>
              {/**INPUT */}
              <input
                type="text"
                value={searchQuery[paramsKey1]}
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    [paramsKey1]: e.target.value,
                  })
                }
              />
              {/**AND OR SELECT */}
              <select
                value={searchQuery.andor1}
                onChange={(e) => {
                  setSearchQuery({ ...searchQuery, andor1: e.target.value });
                }}
              >
                <option value={""}></option>
                {searchAndOrList.map((val) => (
                  <option key={val} value={val.toLowerCase()}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <div id="search2">
              {/**SELECT */}
              <select
                style={{ width: "100px" }}
                value={paramsKey2}
                onChange={(e) => {
                  setParamsKey2(e.target.value);
                }}
                disabled={!searchQuery.andor1}
              >
                <option value={""} hidden disabled></option>
                {searchParamList
                  .filter((x) => x.toLowerCase() !== paramsKey1.toLowerCase())
                  .map((val) => (
                    <option key={val} value={val.toLowerCase()}>
                      {val}
                    </option>
                  ))}
              </select>
              {/**INPUT */}
              <input
                type="text"
                value={searchQuery[paramsKey2]}
                disabled={!searchQuery.andor1}
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    [paramsKey2]: e.target.value,
                  })
                }
              />
              {/**AND OR SELECT */}
              <select
                value={searchQuery.andor2}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, andor2: e.target.value })
                }
                disabled={!searchQuery.andor1}
              >
                <option value={""}></option>
                {searchAndOrList.map((val) => (
                  <option key={val} value={val.toLowerCase()}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <div id="search3">
              {/**SELECT */}
              <select
                style={{ width: "100px" }}
                value={paramsKey3}
                onChange={(e) => {
                  setParamsKey3(e.target.value);
                }}
                disabled={!searchQuery.andor2}
              >
                <option value={""} hidden disabled></option>
                {searchParamList
                  .filter(
                    (x) =>
                      x.toLowerCase() !== paramsKey1.toLowerCase() &&
                      x.toLowerCase() !== paramsKey2.toLowerCase()
                  )
                  .map((val) => (
                    <option key={val} value={val.toLowerCase()}>
                      {val}
                    </option>
                  ))}
              </select>
              {/**INPUT */}
              <input
                type="text"
                disabled={!searchQuery.andor2}
                value={searchQuery[paramsKey3]}
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    [paramsKey3]: e.target.value,
                  })
                }
              />
              {/**AND OR SELECT */}
              <select
                value={searchQuery.andor3}
                disabled={!searchQuery.andor2}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, andor3: e.target.value })
                }
              >
                <option value={""}></option>
                {searchAndOrList.map((val) => (
                  <option key={val} value={val.toLowerCase()}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <div id="search4">
              {/**SELECT */}
              <select
                style={{ width: "100px" }}
                value={paramsKey4}
                onChange={(e) => {
                  setParamsKey4(e.target.value);
                }}
                disabled={!searchQuery.andor3}
              >
                <option value={""} hidden disabled></option>
                {searchParamList
                  .filter(
                    (x) =>
                      x.toLowerCase() !== paramsKey1.toLowerCase() &&
                      x.toLowerCase() !== paramsKey2.toLowerCase() &&
                      x.toLowerCase() !== paramsKey3.toLowerCase()
                  )
                  .map((val) => (
                    <option key={val} value={val.toLowerCase()}>
                      {val}
                    </option>
                  ))}
              </select>
              {/**INPUT */}
              <input
                type="text"
                disabled={!searchQuery.andor3}
                value={searchQuery[paramsKey4]}
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    [paramsKey4]: e.target.value,
                  })
                }
              />
              <div></div>
            </div>
          </div>

          <div>
            <label htmlFor="" className="mx-2">
              sort by
            </label>
            <select
              style={{ width: "100px" }}
              value={searchQuery.sortBy}
              onChange={(e) => {
                setSearchQuery({ ...searchQuery, sortBy: e.target.value });
              }}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
            <label htmlFor="" className="mx-2">
              sort order
            </label>
            <select
              style={{ width: "100px" }}
              value={searchQuery.sortOrder}
              onChange={(e) => {
                setSearchQuery({ ...searchQuery, sortOrder: e.target.value });
              }}
            >
              <option value="asc">Ascending</option>
              <option value="dsc">Descending</option>
            </select>
          </div>

          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((val, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.title}</td>
                  <td>{val.author}</td>
                  <td>{val.category}</td>
                  <td>{val.isbn}</td>
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
        </Card.Body>
      </Card>
    </>
  );
};

export default BookList;
