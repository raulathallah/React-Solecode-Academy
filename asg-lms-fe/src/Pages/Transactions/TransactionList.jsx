import { Badge, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Elements/Loading";
import { useEffect, useState } from "react";
import { getAllBorrow } from "../../api/Transactions";
import { getAllBook } from "../../api/Books";
import { getAllUser } from "../../api/Users";

const TransactionList = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [listUser, setListUser] = useState([]);

  //GET BORROW
  useEffect(() => {
    getAllBorrow(
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  useEffect(() => {
    getAllBook(
      (res) => {
        setListBook(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  useEffect(() => {
    getAllUser(
      (res) => {
        setListUser(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  useEffect(() => {
    if (list) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [list]);

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

  return (
    <Card>
      <Card.Header>Book Borrow List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div className="d-flex gap-2">
          <Button variant="primary" as={Link} to={"/transactions/borrow"}>
            Borrow
          </Button>
          <Button variant="primary" as={Link} to={"/transactions/return"}>
            Return
          </Button>
        </div>

        {loading ? (
          <Loading />
        ) : (
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
              {list.map((val, key) => (
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
        )}
      </Card.Body>
    </Card>
  );
};

export default TransactionList;
