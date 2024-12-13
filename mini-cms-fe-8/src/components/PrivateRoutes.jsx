/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);
  const hasRequiredRole = () => {
    if (!allowedRoles) return true;
    console.log(user?.roles);
    return user?.roles?.some((role) => allowedRoles.includes(role)) || false;
  };
  if (allowedRoles && !hasRequiredRole()) {
    // Redirect ke halaman unauthorized jika role tidak sesuai

    return <Navigate to="/unauthorized" replace />;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
