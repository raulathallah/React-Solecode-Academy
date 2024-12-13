import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "../components/Elements/Loading";
import { fetchDashboard } from "../api/Fetchs/FetchDashboard";
import { useSelector } from "react-redux";
import { Badge, Button, Card, Container, Table } from "react-bootstrap";
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
import { Link } from "react-router-dom";
import moment from "moment/moment";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboard(),
    placeholderData: keepPreviousData,
  });

  const { user: currentUser } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <p>Error...</p>;
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

  if (currentUser && currentUser?.roles.includes("Employee")) {
    return (
      <p>
        Welcome, {currentUser?.employee?.fname} {currentUser?.employee?.lname}!
      </p>
    );
  }

  return (
    <div className="d-grid gap-3">
      <div className="d-flex gap-3">
        <Card className="w-100">
          <Card.Header>Employee Distribution by Department</Card.Header>
          <Card.Body>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.empDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ department, percent }) =>
                      `${department} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="empCount"
                  >
                    {data?.empDistribution.map((entry, index) => (
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
          <Card.Header>Salary Average by Department</Card.Header>
          <Card.Body>
            <BarChart
              width={400}
              height={300}
              data={data?.deptAvgSalary}
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="department"
                type="category"
                allowDecimals={true}
              />
              <YAxis type="number" dataKey="avgSalary" width={100} />
              <Tooltip />
              <Bar dataKey="avgSalary" fill="#0d6efd" />
            </BarChart>
          </Card.Body>
        </Card>
        <Card className="w-100">
          <Card.Header className="d-flex justify-content-between">
            Top 5 Employee by Performance
          </Card.Header>
          <Card.Body>
            {data?.empTopPerformance.map((val, index) => (
              <div className="tw-flex tw-justify-between" key={index}>
                <p>{val?.empName}</p>
                <p>
                  <span className="fw-bold">{val?.totalHoursworked}</span> Hours
                </p>
              </div>
            ))}
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
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Days</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.processToFollowUpData.map((val, key) => (
                <tr key={key}>
                  {/* <td>{getTableNumber(itemOffset, itemsPerPage, key)}</td> */}
                  <td>
                    {val.requestDate
                      ? moment(val.requestDate).format("DD MMMM YYYY")
                      : null}
                  </td>
                  <td>{val.employeeName}</td>
                  <td>{val.startDate}</td>
                  <td>{val.endDate}</td>
                  <td>{val.totalDays}</td>
                  <td>{val.leaveType}</td>
                  <td>{val.reason}</td>
                  <td>{val.status ? getStatus(val.status) : null}</td>
                  <td style={{ width: "100px" }}>
                    <Container className="d-flex gap-2">
                      <Button
                        as={Link}
                        variant="dark"
                        size="sm"
                        to={`/leave-request/${val.leaveRequestId}`}
                      >
                        Detail
                      </Button>
                      {val.status && val.status.includes("Under") && (
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/leave-request/${val.leaveRequestId}/review`}
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

export default Dashboard;
