/* eslint-disable react/prop-types */
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { categories } from "../../utils/Categories";
import { useEffect, useRef } from "react";

export const MenuForm = ({
  onAdd,
  onEdit,
  onCancel,
  onChangeValue,
  newMenu,
  type,
  handleClose,
  show,
}) => {
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {type === "add" ? `Add Menu` : `Edit Menu - ID: ${newMenu.id}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
