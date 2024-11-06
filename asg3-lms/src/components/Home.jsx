import { getBooks } from "../utils/Books";
import { getMembers } from "../utils/Members";

const Home = () => {
  return (
    <div>
      <p className="d-flex gap-2">
        Total Books available:
        <span className="fw-bold">{getBooks().length}</span>
      </p>
      <p className="d-flex gap-2">
        Total Member available:
        <span className="fw-bold">{getMembers().length}</span>
      </p>
    </div>
  );
};

export default Home;
