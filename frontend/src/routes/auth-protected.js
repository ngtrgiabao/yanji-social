import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks";
import { RouteNames } from "../constant/routes";

const AuthProtected = () => {
  const currentUser = useCurrentUser();

  if (!currentUser || !currentUser._id) {
    return <Navigate to={RouteNames.LOGIN} replace />;
  }

  return <Outlet />;
};

export { AuthProtected };
