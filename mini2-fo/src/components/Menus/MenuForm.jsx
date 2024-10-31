/* eslint-disable react/prop-types */
import { Button, Col, Form, Row } from "react-bootstrap";
import { categories } from "../../utils/Categories";
import { useEffect, useRef } from "react";

export const MenuForm = ({
  onAdd,
  onEdit,
  onCancel,
  onChangeValue,
  newMenu,
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
      <Form.Group as={Row} className="mb-3" controlId="formName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            ref={inputFocus}
            type="text"
            required
            value={newMenu.name}
            size="sm"
            onChange={(e) => onChangeValue("name", e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPrice">
        <Form.Label column sm="2">
          Price
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            required
            max={100000}
            min={0}
            value={newMenu.price}
            size="sm"
            onChange={(e) => onChangeValue("price", e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formCategory">
        <Form.Label column sm="2">
          Category
        </Form.Label>
        <Col sm="10">
          <Form.Select
            aria-label="Default select example"
            required
            value={newMenu.category}
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
      <Form.Group as={Row} className="mb-3" controlId="formRating">
        <Form.Label column sm="2">
          Rating
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            required
            max={5}
            min={0}
            maxLength={1}
            value={newMenu.rating}
            size="sm"
            onChange={(e) => onChangeValue("rating", e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formCategory">
        <Form.Label column sm="2">
          Availability
        </Form.Label>
        <Col sm="10">
          <Form.Select
            required
            value={newMenu.isAvailable}
            onChange={(e) => onChangeValue("isAvailable", e)}
          >
            <option key={1} value={"true"}>
              Available
            </option>
            <option key={2} value={"false"}>
              Unavailable
            </option>
          </Form.Select>
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
