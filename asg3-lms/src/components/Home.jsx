import { getBooks } from "../utils/Books";

const Home = () => {
  return <p>Books available: {getBooks().length}</p>;
};

export default Home;
