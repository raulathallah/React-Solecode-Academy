import { useState } from "react"

export const UpdateObjectState = () => {
    const [person, setPerson] = useState({
        firstName: "First",
        lastName: "Last",
        email: "email@gmail.com"
    })

    const handleChange = (key, e) => {
        setPerson({
            ...person,
            [key]: e.target.value
        })
    }

    const [id, setId] = useState(0);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({
        name: "",
        description: "",
    })
    const handleChangeItem = (key, e) => {
        setItem({
            ...item,
            [key]: e.target.value
        })
    }
    const onAddItem = () => {
        setItems(
            [
            ...items,
            {id: id + 1, name: item.name, description: item.description }
            ]
        );
        setId((prev) =>{return prev + 1});
    }
    const onDeleteItem = (itemId) => {
        setItems((prev) => {return prev.filter((x)=> x.id !== itemId)})
    }
    const onUpdateItem = (x) => {
        setItems(items.map(i=>(i.id===x.id ? x : i)));
    }
    console.log(items)
    return(
        <>
            {/* <p>First Name: {person.f   irstName}</p>
            <p>Last Name: {person.lastName}</p>
            <p>Email: {person.email}</p>
            <div style={{display: "grid"}}> 
                <input value={person.firstName} onChange={(e)=> handleChange("firstName", e)}></input>
                <input value={person.lastName} onChange={(e)=> handleChange("lastName", e)}></input>
                <input value={person.email} onChange={(e)=> handleChange("email", e)}></input>
            </div> */}


            <div style={{display: "grid", gap: "15px"}}> 
                <input placeholder="name" value={item.name} onChange={(e)=> handleChangeItem("name", e)}></input>
                <input placeholder="description" value={item.description} onChange={(e)=> handleChangeItem("description", e)}></input>
                <button onClick={onAddItem}>Add Item</button>
            </div>
            {items.map((val) =>
            <div key={val.id} style={{display:"flex", gap: "15px", alignItems: "center"}}>
                <p>{val.name}</p>
                <p>{val.description}</p>
                <button style={{padding: "2px", height: "30px"}} onClick={()=>onDeleteItem(val.id)}>delete</button>
                <button style={{padding: "2px", height: "30px"}} onClick={()=>onUpdateItem(item)}>update</button>
            </div>
            )}
        </>
    )
}