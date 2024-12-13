/* eslint-disable react/prop-types */

import { Card, Form, Tab, Tabs } from "react-bootstrap";
import ReportPDF from "./ReportPDF";
import {
  getEmployeeListReport,
  getLeaveRequestReport,
  getProjectReport,
} from "../../api/Report";
import { useEffect, useState } from "react";
import { getAllDepartment } from "../../api/Department";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deptNo, setDeptNo] = useState("");
  const [listDepartment, setListDepartment] = useState([]);

  useEffect(() => {
    getAllDepartment().then((res) => {
      if (res.status === 200) {
        setListDepartment(res.data);
      }
    });
  }, []);

  return (
    <Card>
      <Card.Header>Reports</Card.Header>
      <Card.Body className="d-grid gap-3">
        <Tabs defaultActiveKey="employeeList" id="tabReport" className="mb-3">
          <Tab eventKey="employeeList" title="Employee List by Department">
            <Form.Group controlId="formEndDate">
              <Form.Label className="fw-semibold">Department</Form.Label>

              <Form.Select
                onChange={(e) => setDeptNo(e.target.value)}
                value={deptNo}
                className="form-control tw-w-1/2 mb-3"
                size="sm"
              >
                <option disabled value={""} hidden />
                {listDepartment.map((val) => (
                  <option key={val.deptno} value={val.deptno}>
                    {val.deptname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <ReportPDF
              reportAPI={getEmployeeListReport}
              type={"GET"}
              deptNo={deptNo}
            />
          </Tab>
          <Tab eventKey="leaveRequest" title="Leave Request by Type">
            <div className="d-flex gap-3">
              <div className="col-md-4 mb-3">
                <Form.Group controlId="formStartDate">
                  <Form.Label className="fw-semibold">Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    size="sm"
                  />
                </Form.Group>
              </div>
              <div className="col-md-4 mb-3">
                <Form.Group controlId="formEndDate">
                  <Form.Label className="fw-semibold">End Date</Form.Label>
                  <Form.Control
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                    size="sm"
                  />
                </Form.Group>
              </div>
            </div>
            <ReportPDF
              reportAPI={getLeaveRequestReport}
              type="POST"
              startDate={startDate}
              endDate={endDate}
            />
          </Tab>
          <Tab eventKey="project" title="Project">
            <ReportPDF reportAPI={getProjectReport} type={"GET"} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default Reports;
