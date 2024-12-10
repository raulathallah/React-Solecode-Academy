import { useNavigate, useParams } from "react-router";
import {
  bookApproval,
  getBookRequestDetail,
} from "../../api/services/Transactions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import Loading from "../../components/Elements/Loading";
import ErrorMessage from "../../utils/ErrorMessage";

const fetchBookRequestDetail = async ({ id }) => {
  const { data } = await getBookRequestDetail(id);
  return data;
};
const initialValue = {
  bookRequestId: 0,
  approval: "",
  notes: "",
};
const RequestDetail = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["bookRequestDetail"],
    queryFn: () => fetchBookRequestDetail({ id }),
    placeholderData: keepPreviousData,
  });

  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const [approval, setApproval] = useState(initialValue);

  useEffect(() => {
    if (data) {
      setDetail(data);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      setApproval({ ...approval, bookRequestId: id ? parseInt(id) : null });
    }
  }, [id]);

  const onCancel = () => {
    navigate(-1);
  };
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

  const onSubmitReview = () => {
    setLoading(true);
    bookApproval(approval).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book request approval success!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/request");
        }, 1500);
      } else {
        if (res.message) {
          ErrorMessage(res.message);
        }
      }
      setLoading(false);
    });
  };
  const onTryApproval = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Are you sure want to ${
        approval.approval === "Approved" ? "APPROVE" : "REJECT"
      }?`,
      text: `${detail.title} by ${detail.author}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmitReview();
      }
    });
  };
  if (isLoading || loading) {
    return <Loading />;
  }
  return (
    <Card className="w-75">
      <Card.Header>Book Request Review</Card.Header>
      <Card.Body className="d-grid">
        <Row>
          <Col>
            <Card.Text className="d-flex gap-2">
              <span className="fw-semibold">Requester: </span>
              <span>{detail.requesterName}</span>
            </Card.Text>
            <Card.Text className="d-flex gap-2">
              <span className="fw-semibold">Request Date: </span>
              <span>{detail.requestDate}</span>
            </Card.Text>
          </Col>
          <Col>
            <Card.Text className="d-flex gap-2">
              <span className="fw-semibold">Process Id: </span>
              <span>{detail.processId}</span>
            </Card.Text>
            <Card.Text className="d-flex gap-2">
              <span className="fw-semibold">Current Status: </span>
              <span>{detail.status && getStatus(detail.status)}</span>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Body className="d-grid">
        <Card.Subtitle className="fs-4 mb-2">Book Detail</Card.Subtitle>
        <div className="d-flex gap-2">
          <span className="fw-semibold">Title: </span>
          <span>{detail.title}</span>
        </div>
        <div className="d-flex gap-2">
          <span className="fw-semibold">Author: </span>
          <span>{detail.author}</span>
        </div>
        <div className="d-flex gap-2">
          <span className="fw-semibold">Publisher: </span>
          <span>{detail.publisher}</span>
        </div>
        <div className="d-flex gap-2">
          <span className="fw-semibold">Isbn: </span>
          <span>{detail.isbn}</span>
        </div>
      </Card.Body>

      <Card.Body className="d-grid">
        <Card.Subtitle className="fs-6 fw-semibold mb-2">
          Request History
        </Card.Subtitle>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              {/* <th style={{ width: "5%" }}>No.</th> */}
              <th>Review Date</th>
              <th>Action By</th>
              <th>Action</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {detail &&
              detail.requestHistory?.map((val, key) => (
                <tr key={key}>
                  {/* <td>{getTableNumber(itemOffset, itemsPerPage, key)}</td> */}
                  <td>{val.actionDate}</td>
                  <td>{val.actorName}</td>
                  <td>{val.action}</td>
                  <td>{val.comments}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>

      {type !== "detail" && (
        <Card.Body>
          <Form.Group as={Row} controlId="formSex">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Status</Form.Label>
            </Col>
            <Col sm="5">
              <div className="d-flex gap-4">
                <Form.Check
                  label={
                    <p style={{ color: "green" }} className="fw-bold">
                      Approve
                    </p>
                  }
                  name="group1"
                  type="radio"
                  value={"Approved"}
                  checked={approval.approval === "Approved"}
                  onChange={(e) =>
                    setApproval({ ...approval, approval: e.target.value })
                  }
                  id={`checkbox-1`}
                  //isInvalid={errors.sex}
                />
                <Form.Check
                  inline
                  label={
                    <p style={{ color: "red" }} className="fw-bold">
                      Reject
                    </p>
                  }
                  name="group1"
                  type="radio"
                  value={"Rejected"}
                  checked={approval.approval === "Rejected"}
                  id={`checkbox-1`}
                  onChange={(e) =>
                    setApproval({ ...approval, approval: e.target.value })
                  }
                  //isInvalid={errors.sex}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formNotes">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Notes</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Text
                as={"textarea"}
                onChange={(e) =>
                  setApproval({ ...approval, notes: e.target.value })
                }
                value={approval.notes}
                cols={44}
                rows={5}
              />
            </Col>

            {/* {errors.deptno && <small>{errors.deptno}</small>} */}
          </Form.Group>
        </Card.Body>
      )}

      <Card.Footer className="text-muted">
        <div className="d-flex justify-content-start gap-2">
          {type !== "detail" && (
            <Button variant="primary" onClick={onTryApproval}>
              Submit Review
            </Button>
          )}

          <Button variant="secondary" onClick={onCancel}>
            Back
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default RequestDetail;
