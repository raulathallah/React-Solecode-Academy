/* eslint-disable react/prop-types */
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";

export const CustomerForm = ({
  onAdd,
  onEdit,
  onCancel,
  onChangeValue,
  newCustomer,
  type,
  handleClose,
  show,
}) => {
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Modal.Header closeButton>
          {type === "add"
            ? `Add Customer`
            : `Edit Customer - ID ${newCustomer.id}`}
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
                value={newCustomer.name}
                size="sm"
                onChange={(e) => onChangeValue("name", e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                required
                value={newCustomer.email}
                size="sm"
                onChange={(e) => onChangeValue("email", e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPhone">
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="tel"
                placeholder="08XXXXXXXX"
                maxLength={10}
                required
                value={newCustomer.phone}
                size="sm"
                onChange={(e) => onChangeValue("phone", e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formAddress">
            <Form.Label column sm="2">
              Address
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                as={"textarea"}
                rows={5}
                maxLength={200}
                required
                value={newCustomer.address}
                size="sm"
                onChange={(e) => onChangeValue("address", e)}
              />
              <p style={{ fontSize: "12px" }}>
                {newCustomer.address.length}/200
              </p>
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
