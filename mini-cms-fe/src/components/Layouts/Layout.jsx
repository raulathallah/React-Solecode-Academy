import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="tw-flex tw-flex-col tw-min-h-screen tw-justify-start">
      <Header />
      <div className="container my-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
