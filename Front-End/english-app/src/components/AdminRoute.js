import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
