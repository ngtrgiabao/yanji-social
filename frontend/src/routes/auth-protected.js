import {Navigate, Outlet} from "react-router-dom";
import { useCurrentUser } from "../hooks";

const AuthProtected = () => {
    const currentUser = useCurrentUser();

    if (!currentUser || !currentUser._id) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export { AuthProtected  };