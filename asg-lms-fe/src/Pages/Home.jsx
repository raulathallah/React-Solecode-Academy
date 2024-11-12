import { useEffect, useState } from "react";
import { getBooks } from "../utils/Books";
import { getMembers } from "../utils/Members";
import { Table } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);

  const [id, setId] = useState("");
  //SYNCHRONUS
  const fetchData = () => {
    fetch("https://reqres.in/api/users/1")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} terjadi gangguan...`);
        }
        return res.json();
      })
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error));
  };

  //ASYNCHRONUS
  const fetchDataAsync = async (page, per_page) => {
    setLoading(true);
    axios
      .get(
        `https://reqres.in/api/users?delay=1&page=${page}&per_page=${per_page}`
      )
      .then((response) => {
        let user = response.data.data;

        setTotalPage(response.data.total_pages);
        setUser(user);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  useEffect(() => {
    //fetchData();
  }, []);

  useEffect(() => {
    fetchDataAsync(page, perPage);
  }, [page, perPage]);

  const addUser = async () => {
    const user = {
      first_name: "First 1",
      last_name: "Last 1",
    };

    await axios
      .post("https://reqres.in/api/users", user)
      .then((res) => {
        console.log(res.data);
        setId(res.data.id);
      })
      .catch((error) => console.log(error.message));
  };

  const updateUser = async () => {
    console.log("UPDATE ID: " + id);
    const user = {
      first_name: "Update First 1",
      last_name: "Last 1",
    };

    await axios
      .put(`https://reqres.in/api/users/${id}`, user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error.message));
  };

  const deleteUser = async () => {
    console.log("DELETE ID: " + id);

    await axios
      .delete(`https://reqres.in/api/users/${id}`, user)
      .then(() => console.log("Delete success!"))
      .catch((error) => console.log(error.message));
  };

  if (isError) {
    return <p>Terjadi gangguan...</p>;
  }

  return (
    <div>
      <div className="d-grid text-center gap-2">
        {loading ? (
          <p className="d-grid justify-content-center text-center gap-2">
            Loading...
          </p>
        ) : (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {user.map((val) => (
                <tr key={val.id}>
                  <td>
                    <img
                      style={{ width: "80px" }}
                      src={val.avatar}
                      alt={`${val.first_name}`}
                    />
                  </td>
                  <td>{val.first_name}</td>
                  <td>{val.last_name}</td>
                  <td>{val.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <p>
          Page {page} of {totalPage}
        </p>
        <div className="d-flex justify-content-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Prev
          </button>
          <label>Per Page</label>
          <input
            defaultValue={perPage}
            type="number"
            onBlur={(e) => setPerPage(e.target.value)}
          />
          <button
            disabled={page === totalPage}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
      <button onClick={addUser}>ADD USER</button>
      <button onClick={updateUser}>UPDATE USER</button>
      <button onClick={deleteUser}>DELETE USER</button>

      {/* <p className="d-flex gap-2">
        Total Books available:
        <span className="fw-bold">{getBooks().length}</span>
      </p>
      <p className="d-flex gap-2">
        Total Member available:
        <span className="fw-bold">{getMembers().length}</span>
      </p> */}
    </div>
  );
};

export default Home;
