import { useEffect, useState } from "react";
import { getAllBook } from "../api/Books";
import { getAllUser } from "../api/Users";

const Home = () => {
  const [totalBook, setTotalBook] = useState(null);
  const [totalMember, setTotalMember] = useState(null);

  //GET BOOKS
  useEffect(() => {
    getAllBook().then((res) => {
      if (res.status === 200) {
        setList(res.data.length);
      } else {
        ErrorMessage(res.message);
      }
    });
  }, []);

  //GET USER
  useEffect(() => {
    getAllUser(
      (res) => {
        setTotalMember(res.data.length);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);
  return (
    <div>
      <p className="d-flex gap-2">
        Total Books available:
        <span className="fw-bold">{totalBook}</span>
      </p>
      <p className="d-flex gap-2">
        Total Member available:
        <span className="fw-bold">{totalMember}</span>
      </p>
    </div>
  );
};

export default Home;
