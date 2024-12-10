import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layouts = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5 w-75">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layouts;
