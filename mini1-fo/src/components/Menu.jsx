import { useState } from "react";
import "../styles/Form.css";
import "../styles/Table.css";

export const Menu = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Food");
  const [rating, setRating] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const categories = ["Food", "Beverage", "Dessert"];
  const [menus, setMenus] = useState([
    {
      name: "Mie Goreng",
      price: 5000,
      category: "Food",
      rating: 4,
      isAvailable: true,
    },
  ]);

  const resetForm = () => {
    setName("");
    setPrice(0);
    setCategory("Food");
    setRating(0);
    setIsAvailable(true);
  };
  const validateMenu = () => {
    //`Name` can not be null, the character length 2-100
    if (!name) {
      alert("Name cannot be null!");
      return false;
    }
    if (name.length < 2 || name.length > 100) {
      alert("Name should be 2 - 100 characters!");
      return false;
    }
    //`Price` should be positive number between 0.01 and 100000
    if (price < 0.01 || price > 100000) {
      alert("Price should be 0.01 - 100000!");
      return false;
    }
    //`Rating` a number between 0 and 5
    if (rating < 0 || rating > 5) {
      alert("Rating should be 0 - 5!");
      return false;
    }

    return true;
  };
  const onAddMenu = () => {
    const isValidate = validateMenu();
    if (!isValidate) {
      return null;
    } else {
      const body = {
        name: name,
        price: price,
        category: category,
        rating: rating,
        isAvailable: isAvailable,
      };

      setMenus([...menus, body]);
      alert("Menu added!");
      resetForm();
    }
  };
  const onDeleteMenu = (menu) => {
    setMenus([...menus.filter((val) => val !== menu)]);
    alert("Menu deleted!");
  };

  return (
    <div className="content-container">
      <div>
        <h3>Add Menu</h3>
        <div className="form">
          <label htmlFor="name">Name</label>{" "}
          <input
            type="text"
            id="name"
            placeholder="Input name..."
            required
            value={name}
            onChange={(v) => setName(v.target.value)}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="0.01 - 100000"
            required
            id="price"
            value={price}
            onChange={(v) => setPrice(v.target.value)}
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={(v) => setCategory(v.target.value)}
            value={category}
          >
            {categories.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="year"
            value={rating}
            placeholder="0 - 5"
            max={5}
            min={0}
            onChange={(v) => setRating(v.target.value)}
          />
          <label htmlFor="isAvailable">Availability</label>
          <select
            id="isAvailable"
            value={isAvailable}
            onChange={(v) => {
              console.log(v.target.value);
              if (v.target.value == "false") {
                setIsAvailable(false);
              } else {
                setIsAvailable(true);
              }
            }}
          >
            <option key={1} value={true}>
              Available
            </option>
            <option key={2} value={false}>
              Unavailable
            </option>
          </select>
        </div>

        <button className="button" onClick={() => onAddMenu()}>
          Submit
        </button>
      </div>

      <div>
        <h3>Menu List</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Availablity</th>
            <th>Action</th>
          </tr>
          {menus.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.price}</td>
              <td>{val.category}</td>
              <td>{val.rating}</td>
              <td>{!val.isAvailable ? "Unavailable" : "Available"}</td>
              <td className="">
                <button className="button-table">Edit</button>
                <button
                  className="button-table"
                  onClick={() => onDeleteMenu(val)}
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
