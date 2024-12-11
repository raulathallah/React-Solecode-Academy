import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "../components/Elements/Loading";
import { getDashboard } from "../api/services/Stocks";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge, Button, Card, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const fetchDashboard = async () => {
  const { data } = await getDashboard();
  return data;
};

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboard(),
    placeholderData: keepPreviousData,
  });

  const { user: currentUser } = useSelector((state) => state.auth);

  console.log(currentUser.roles[0]);

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

  if (isLoading && !data) {
    return <Loading />;
  }

  if (isError && error) {
    return <p>Error...</p>;
  }

  if (currentUser?.roles && currentUser?.roles.includes("Library User")) {
    return (
      <h3>
        Welcome, {currentUser?.user?.fName} {currentUser?.user?.lName}!
      </h3>
    );
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const getOverdue = (days) => {
    let bg = "";
    if (days <= 3) {
      bg = "info";
    }
    if (days > 3) {
      bg = "warning";
    }
    if (days >= 7) {
      bg = "danger";
    }

    return <Badge bg={bg}>{`${days} Days`}</Badge>;
  };
  return (
    <div className="d-grid gap-3">
      <div className="d-flex justify-content-between gap-3 text-white">
        <div className="d-grid text-center w-100 bg-primary rounded p-4">
          <h5>Total Books</h5>
          <h1 className="display-2 fw-semibold">{data?.totalBooks}</h1>
        </div>
        <div className="d-grid text-center w-100 bg-warning rounded p-4">
          <h5>Total Process to Follow Up</h5>
          <h1 className="display-2 fw-semibold">{data?.processToFollowUp}</h1>
        </div>
      </div>

      <div className="d-flex gap-3">
        <Card className="w-100">
          <Card.Header>Most Active Members</Card.Header>
          <Card.Body>
            <BarChart
              width={300}
              height={400}
              data={data?.mostActiveUsers}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="totalTransaction" fill="#0d6efd" />
            </BarChart>
          </Card.Body>
        </Card>
        <Card className="w-100">
          <Card.Header>Books by Category</Card.Header>
          <Card.Body>
            <div style={{ height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.booksPerCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ category, percent }) =>
                      `${category} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {data?.booksPerCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
        <Card className="w-100">
          <Card.Header className="d-flex justify-content-between">
            <span>Overdue Books</span>

            <Badge bg="danger">{data?.overdueBooks?.length} Books</Badge>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Members</th>
                  <th>Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {data?.overdueBooks.map((val, key) => (
                  <tr key={key}>
                    <td>{val.title}</td>
                    <td>{val.username}</td>
                    <td>
                      {val.overdueDays ? getOverdue(val.overdueDays) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
      <Card className="w-100">
        <Card.Header>Follow-up Tasks by User</Card.Header>
        <Card.Body>
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
              {data?.proccessToFollowUpData &&
                data?.proccessToFollowUpData.map((val, key) => (
                  <tr key={key}>
                    {/* <td>{getTableNumber(itemOffset, itemsPerPage, key)}</td> */}
                    <td>{val.requestDate}</td>
                    <td>{val.requesterName}</td>
                    <td>{val.title}</td>
                    <td>{val.author}</td>
                    <td>{val.publisher}</td>
                    <td>{val.isbn}</td>
                    <td>{getStatus(val.status)}</td>
                    <td style={{ width: "100px" }}>
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
