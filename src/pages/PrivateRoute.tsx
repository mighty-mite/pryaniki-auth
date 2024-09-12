import { useContext } from "react";
import AuthContext from "../context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { token } = useContext(AuthContext);
  const sessionToken = sessionStorage.getItem("token");
  const location = useLocation();

  return token === sessionToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
