import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Layouts/Footer";
import Header from "./Layouts/Header";
import Layouts from "./Layouts/Layouts";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  const hasRequiredRole = () => {
    if (!allowedRoles) return true;

    return user?.roles?.some((role) => allowedRoles.includes(role)) || false;
  };

  if (allowedRoles && !hasRequiredRole()) {
    // Redirect ke halaman unauthorized jika role tidak sesuai
    return <Navigate to="/unauthorized" />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
