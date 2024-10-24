import { useState } from "react";

import "../styles/Form.css";
import "../styles/Table.css";
export const Customer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [customers, setCustomers] = useState([
    {
      name: "Raul",
      email: "raul@email.com",
      phone: "0812422291",
      address: "Jalan Satu, Jakarta",
    },
  ]);
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };
  const validateCustomer = () => {
    //Name: Required, length between 2-100 characters.
    if (!name) {
      alert("Name cannot be null!");
      return false;
    }
    if (name.length < 2 || name.length > 100) {
      alert("Name should be 2 - 100 characters!");
      return false;
    }
    //Email: Required and must be in a valid email format.
    if (!email.includes("@") && !email.includes(".")) {
      alert("Email should be valid email address!");
      return false;
    }
    //PhoneNumber: Must be in a valid phone number format (optional).
    if (phone.length !== 10) {
      alert("Phone number should be 10 digits!");
      return false;
    }
    //Address: Maximum 200 characters (optional).
    if (address.length > 200) {
      alert("Address maximum 200 characters!");
      return false;
    }
    return true;
  };
  const onAddCustomer = () => {
    const isValidate = validateCustomer();
    if (!isValidate) {
      return null;
    } else {
      const body = [
        {
          name: name,
          email: email,
          phone: phone,
          address: address,
        },
      ];
      setCustomers([...customers, ...body]);
      alert("Customer added!");
      resetForm();
    }
  };
  const onDeleteCustomer = (customer) => {
    setCustomers([...customers.filter((val) => val !== customer)]);
    alert("Customer deleted!");
  };
  return (
    <div className="content-container">
      <div>
        <h3>Add Customer</h3>
        <div className="form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Input name..."
            value={name}
            onChange={(v) => setName(v.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(v) => setEmail(v.target.value)}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            maxLength={10}
            placeholder="08XXXXXXXX"
            //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={phone}
            onChange={(v) => setPhone(v.target.value)}
          />
          <label htmlFor="address">Address</label>
          <div>
            <textarea
              rows={4}
              cols={50}
              id="address"
              placeholder="Input address..."
              maxLength={200}
              value={address}
              onChange={(v) => setAddress(v.target.value)}
            />
            <p style={{ fontSize: "11px" }}>{address.length}/200</p>
          </div>
        </div>

        <button className="button" onClick={() => onAddCustomer()}>
          Submit
        </button>
      </div>

      <div>
        <h3>Customer List</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {customers.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.phone}</td>
              <td>{val.address}</td>
              <td className="bl-action">
                <button className="button-table">Edit</button>
                <button
                  className="button-table"
                  onClick={() => onDeleteCustomer(val)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
