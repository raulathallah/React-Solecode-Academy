/* eslint-disable react/prop-types */
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ErrorMessage from "../../utils/ErrorMessage";

const ReportPDF = ({ reportAPI, type, deptNo, startDate, endDate }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filename, setFileName] = useState("");

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const handleGenerateReport = async () => {
    if (type === "POST") {
      if (!startDate || !endDate) {
        return ErrorMessage("Pick a date range!");
      }
    } else if (type === "GET" && deptNo) {
      if (!deptNo) {
        return ErrorMessage("Choose department!");
      }
    }

    try {
      setLoading(true);
      setError(null);

      //const response = await getBookPurchaseReport({ startDate, endDate });

      let response = null;
      let tempFileName = "";

      if (type === "POST") {
        response = await reportAPI({ startDate, endDate });
        tempFileName = "LeaveRequestReport_" + new Date().toLocaleString();
      } else if (type === "GET" && deptNo) {
        response = await reportAPI(deptNo);
        tempFileName = "EmployeeListReport_" + new Date().toLocaleString();
      } else if (type === "GET") {
        response = await reportAPI();
        tempFileName = "ProjectReport_" + new Date().toLocaleString();
      }

      if (response) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        const contentDisposition = response.headers.get("content-disposition");
        //console.log(contentDisposition);

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          );
          if (fileNameMatch && fileNameMatch[1]) {
            tempFileName = fileNameMatch[1].replace(/['"]/g, "");
            setFileName(tempFileName);
          }
        } else {
          setFileName(tempFileName);
        }

        setTimeout(() => {
          setPdfFile(pdfUrl);
          setShowPDF(true);
          setLoading(false);
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      setError("Gagal menghasilkan laporan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfFile) {
      const link = document.createElement("a");
      link.href = pdfFile;
      link.setAttribute("download", `${filename}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    setError("Error loading PDF: " + error.message);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  return (
    <div>
      <div className="mb-2">
        <button
          onClick={handleGenerateReport}
          disabled={loading}
          className="btn btn-primary me-2"
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            "Preview Report"
          )}
        </button>
        {pdfFile && (
          <button className="btn btn-success" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        )}
      </div>

      <div className="col-12">
        {/* PDF Viewer */}
        {showPDF && (
          <div className="card">
            <div className="card-body">
              {loading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {pdfFile && (
                <>
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="text-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="mx-auto"
                      width={Math.min(window.innerWidth * 0.9, 800)}
                    />
                  </Document>
                  {numPages && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={goToPreviousPage}
                        disabled={pageNumber <= 1}
                        className="btn btn-primary"
                      >
                        Previous
                      </button>

                      <p className="mb-0">
                        Page {pageNumber} of {numPages}{" "}
                      </p>

                      <button
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        className="btn btn-primary"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPDF;
