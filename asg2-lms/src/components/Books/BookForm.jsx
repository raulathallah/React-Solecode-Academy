/* eslint-disable react/prop-types */
import { Button, Col, Form, Row } from "react-bootstrap";
import { categories } from "../../utils/Categories";
import { useEffect, useRef } from "react";

export const BookForm = ({
  onAdd,
  onEdit,
  onCancel,
  onChangeValue,
  newBook,
  type,
}) => {
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  return (
    <Form onSubmit={type === "add" ? onAdd : onEdit}>
      <Form.Group as={Row} className="mb-3" controlId="formTitle">
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm="10">
          <Form.Control
            ref={inputFocus}
            type="text"
            required
            value={newBook.title}
            size="sm"
            onChange={(e) => onChangeValue("title", e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formAuthor">
        <Form.Label column sm="2">
          Author
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            required
            value={newBook.author}
            size="sm"
            onChange={(e) => onChangeValue("author", e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formAuthor">
        <Form.Label column sm="2">
          Category
        </Form.Label>
        <Col sm="10">
          <Form.Select
            aria-label="Default select example"
            required
            onChange={(e) => onChangeValue("category", e)}
          >
            {categories.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formAuthor">
        <Form.Label column sm="2">
          Year
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            required
            max={new Date().getFullYear()}
            value={newBook.year}
            size="sm"
            onChange={(e) => onChangeValue("year", e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formAuthor">
        <Form.Label column sm="2">
          ISBN
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={newBook.isbn}
            required
            size="sm"
            onChange={(e) => onChangeValue("isbn", e)}
          />
        </Col>
      </Form.Group>
      <div className="d-flex justify-content-end">
        {type !== "edit" ? (
          <>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </>
        ) : (
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        )}
      </div>
    </Form>
  );
};
