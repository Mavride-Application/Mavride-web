import { isAuthenticated } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
