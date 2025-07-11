import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Xin chào {user?.username}</h2>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
