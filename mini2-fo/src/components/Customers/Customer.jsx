import { useEffect, useState } from "react";
import { CustomerForm } from "./CustomerForm";
import { CustomerList } from "./CustomerList";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
export const Customer = () => {
  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [editBool, setEditBool] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    id: id + 1,
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [customers, setCustomers] = useState([]);
  const [filteredCustomer, setFilteredCustomer] = useState([]);

  const validateCustomer = () => {
    //Name: Required, length between 2-100 characters.
    if (!newCustomer.name) {
      alert("Name cannot be null!");
      return false;
    }
    if (newCustomer.name.length < 2 || newCustomer.name.length > 100) {
      alert("Name should be 2 - 100 characters!");
      return false;
    }
    //Email: Required and must be in a valid email format.
    if (!newCustomer.email.includes("@") || !newCustomer.email.includes(".")) {
      alert("Email should be valid email address!");
      return false;
    }
    //PhoneNumber: Must be in a valid phone number format (optional).
    if (newCustomer.phone.length < 10 || newCustomer.phone.length > 12) {
      alert("Phone number should be 10 - 12 digits!");
      return false;
    }
    //Address: Maximum 200 characters (optional).
    if (newCustomer.address.length > 200) {
      alert("Address maximum 200 characters!");
      return false;
    }
    return true;
  };
  const onAddCustomer = (e) => {
    e.preventDefault();
    const isValidate = validateCustomer();
    if (!isValidate) {
      return null;
    } else {
      let newId = id + 1;
      let customerAddId = { ...newCustomer, id: newId };
      setCustomers([...customers, customerAddId]);
      alert("Customer added!");
      setId(newId);
      clearForm();
    }
  };
  const onDeleteCustomer = (customer) => {
    setCustomers([...customers.filter((val) => val !== customer)]);
    alert("Customer deleted!");
  };
  const onEditCustomer = (e) => {
    e.preventDefault();
    let updatedCustomer = { ...newCustomer, id: editId };
    setCustomers(
      customers.map((val) => (val.id === editId ? updatedCustomer : val))
    );
    alert("Customer Updated!");
    clearForm();
  };
  const openEdit = (customer) => {
    setEditId(customer.id);
    setNewCustomer(customer);
    setEditBool(true);
    openAdd();
  };
  const onCancel = () => {
    setEditId(0);
    setEditBool(false);
    clearForm();
  };
  const onChangeValue = (key, e) => {
    setNewCustomer({
      ...newCustomer,
      [key]: e.target.value,
    });
  };
  const clearForm = () => {
    setNewCustomer({
      id: id,
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditBool(false);
    setShowModal(false);
  };
  const openAdd = () => {
    setShowModal(true);
  };
  const handleCloseAdd = () => {
    setShowModal(false);
    clearForm();
  };
  useEffect(() => {
    setFilteredCustomer(customers);
  }, [customers]);
  useEffect(() => {
    if (!searchKey) {
      setFilteredCustomer(customers);
    } else {
      let fc = customers.filter(
        (x) =>
          x.name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) ||
          x.email.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) ||
          x.phone.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) ||
          x.address.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
      );
      setFilteredCustomer(fc);
    }
  }, [searchKey, customers]);
  return (
    <div className="">
      <Button
        variant="primary"
        onClick={openAdd}
        className="d-flex align-items-center gap-2"
      >
        <FontAwesomeIcon icon={faPlus} />
        Add
      </Button>
      <CustomerForm
        onChangeValue={onChangeValue}
        newCustomer={newCustomer}
        onAdd={onAddCustomer}
        onEdit={onEditCustomer}
        onCancel={onCancel}
        type={!editBool ? "add" : "edit"}
        handleClose={handleCloseAdd}
        show={showModal}
      />
      <div className="p-3 border my-2">
        <h3>Customer List</h3>
        <InputGroup className="mb-3 w-50">
          <Form.Control
            placeholder="Search Name/Email/Phone/Address..."
            type="text"
            required
            value={searchKey}
            size="sm"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
        <CustomerList
          customerList={filteredCustomer}
          onDelete={onDeleteCustomer}
          openEdit={openEdit}
        />
      </div>
    </div>
  );
};
