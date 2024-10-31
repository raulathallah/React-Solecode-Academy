import { useState } from "react";
import "../../styles/Form.css";
import "../../styles/Table.css";
import { categories } from "../../utils/Categories";
import { MenuForm } from "./MenuForm";
import { MenuList } from "./MenuList";

export const Menu = () => {
  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [editBool, setEditBool] = useState(false);
  const [newMenu, setNewMenu] = useState({
    id: id + 1,
    name: "",
    price: 0,
    category: categories[0],
    rating: 0,
    isAvailable: "true",
  });
  const [menus, setMenus] = useState([]);

  const validateMenu = () => {
    //`Name` can not be null, the character length 2-100
    if (!newMenu.name) {
      alert("Name cannot be null!");
      return false;
    }
    if (newMenu.name.length < 2 || newMenu.name.length > 100) {
      alert("Name should be 2 - 100 characters!");
      return false;
    }
    //`Price` should be positive number between 0.01 and 100000
    if (newMenu.price < 0.01 || newMenu.price > 100000) {
      alert("Price should be 0.01 - 100000!");
      return false;
    }
    //`Rating` a number between 0 and 5
    if (newMenu.rating < 0 || newMenu.rating > 5) {
      alert("Rating should be 0 - 5!");
      return false;
    }

    return true;
  };
  const onAddMenu = (e) => {
    e.preventDefault();
    const isValidate = validateMenu();
    if (!isValidate) {
      return null;
    } else {
      let newId = id + 1;
      let menuAddId = { ...newMenu, id: newId };
      setMenus([...menus, menuAddId]);
      setId(newId);
      alert("Menu added!");
      clearForm();
    }
  };
  const onDeleteMenu = (menu) => {
    setMenus([...menus.filter((val) => val !== menu)]);
    alert("Menu deleted!");
  };
  const onChangeValue = (key, e) => {
    setNewMenu({
      ...newMenu,
      [key]: e.target.value,
    });
  };
  const onEditMenu = (e) => {
    e.preventDefault();
    let updatedMenu = { ...newMenu, id: editId };
    setMenus(menus.map((val) => (val.id === editId ? updatedMenu : val)));
    alert("Menu Updated!");
    clearForm();
  };
  const openEdit = (menu) => {
    setEditId(menu.id);
    setNewMenu(menu);
    setEditBool(true);
  };
  const onCancel = () => {
    setEditId(0);
    setEditBool(false);
    clearForm();
  };
  const clearForm = () => {
    setNewMenu({
      id: id,
      name: "",
      price: 0,
      category: categories[0],
      rating: 0,
      isAvailable: "true",
    });
    setEditBool(false);
  };
  return (
    <div className="d-grid gap-3 my-3">
      <div className="border p-3 w-50">
        {!editBool ? (
          <>
            <h3>Add Menu</h3>
            <MenuForm
              onChangeValue={onChangeValue}
              newMenu={newMenu}
              onAdd={onAddMenu}
              type={"add"}
            />
          </>
        ) : (
          <>
            <h3>Edit Menu - ID: {editId}</h3>
            <MenuForm
              onChangeValue={onChangeValue}
              newMenu={newMenu}
              onAdd={onAddMenu}
              onEdit={onEditMenu}
              onCancel={onCancel}
              type={"edit"}
            />
          </>
        )}
      </div>

      <div className="p-3 border my-2">
        <h3>Menu List</h3>
        <MenuList
          menuList={menus}
          onDelete={onDeleteMenu}
          openEdit={openEdit}
        />
      </div>
    </div>
  );
};
