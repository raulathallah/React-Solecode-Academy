/* eslint-disable react/prop-types */

import { Card, Tab, Tabs } from "react-bootstrap";
import ReportPDF from "./ReportPDF";
import {
  getBookPurchaseReport,
  getBookSignOutReport,
} from "../../api/services/Books";

const Reports = () => {
  return (
    <Card>
      <Card.Header>Reports</Card.Header>
      <Card.Body className="d-grid gap-3">
        <Tabs defaultActiveKey="purchaseReport" id="tabReport" className="mb-3">
          <Tab eventKey="purchaseReport" title="Book Purchase">
            <ReportPDF
              reportName="Book Purchase Report"
              reportAPI={getBookPurchaseReport}
            />
          </Tab>
          <Tab eventKey="signOutReport" title="Book Sign Out">
            <ReportPDF
              reportName="Book Sign Out Report"
              reportAPI={getBookSignOutReport}
            />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default Reports;
