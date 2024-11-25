import { Badge, Button, Card, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Elements/Loading";
import { useEffect, useState } from "react";
import { getAllBorrow } from "../../api/services/Transactions";
import { getAllBook } from "../../api/services/Books";
import { getAllUser } from "../../api/services/Users";
import ReactPaginate from "react-paginate";
import ErrorMessage from "../../utils/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchBorrows = async () => {
  const { data } = await getAllBorrow();
  return data;
};

const TransactionList = () => {
  const [list, setList] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [listUser, setListUser] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["borrows"],
    queryFn: () => fetchBorrows(),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  //GET BORROW
  useEffect(() => {
    getAllBorrow(
      (res) => {
        setList(res.data);
      },
      (err) => {
        ErrorMessage(err.message);
      }
    );
  }, []);

  useEffect(() => {
    getAllBook(
      (res) => {
        setListBook(res.data);
      },
      (err) => {
        ErrorMessage(err.message);
      }
    );
  }, []);

  useEffect(() => {
    getAllUser(
      (res) => {
        setListUser(res.data);
      },
      (err) => {
        ErrorMessage(err.message);
      }
    );
  }, []);

  const displayBookName = (bookId) => {
    let book = listBook.find((x) => x.bookid === bookId);

    if (!book) {
      return "BOOK NOT FOUND";
    }

    return book.title;
  };

  const displayMemberName = (userId) => {
    let user = listUser.find((x) => x.userid === userId);
    console.log(listUser);
    if (!user) {
      return "USER NOT FOUND";
    }

    return user.username;
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
      <Card.Header>Book Borrow List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <Button variant="primary" as={Link} to={"/transactions/borrow"}>
              Borrow
            </Button>
            <Button variant="primary" as={Link} to={"/transactions/return"}>
              Return
            </Button>
          </div>
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
              <th>Transaction ID</th>
              <th>Member</th>
              <th>Book</th>
              <th>Borrow Date</th>
              <th>Expired Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, key) => (
              <tr key={key}>
                <td>{val.transactionid}</td>
                <td>{displayMemberName(val.userid)}</td>
                <td>{displayBookName(val.bookid)}</td>
                <td>{val.borrowdate}</td>
                <td>{val.borrowexpired}</td>
                <td>{val.returndate}</td>
                <td className="text-center">
                  {val.isreturned ? (
                    <Badge bg="success">RETURNED</Badge>
                  ) : (
                    <Badge bg="secondary">NOT YET RETURNED</Badge>
                  )}
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

export default TransactionList;
