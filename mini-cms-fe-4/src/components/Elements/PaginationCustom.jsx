/* eslint-disable react/prop-types */
import { Form, Pagination } from "react-bootstrap";

const PaginationCustom = ({ page, onChangePage, onChangePerPage }) => {
  return (
    <div className="tw-flex gap-2">
      <Pagination>
        <Pagination.Prev onClick={() => onChangePage(-1)} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={() => onChangePage(+1)} />
      </Pagination>
      <Pagination className="gap-1">
        <Form.Select onChange={onChangePerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Form.Select>
        <span className="mt-2">/page</span>
      </Pagination>
    </div>
  );
};

export default PaginationCustom;
