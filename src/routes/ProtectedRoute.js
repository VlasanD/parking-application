import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";


export const ProtectedRoute = ({component}) => {
    const { token } = useAuth();
  
    if (!token) {
      return <Navigate to="/signin" />;
    }
    return component;
  };