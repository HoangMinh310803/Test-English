import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../contexts/authContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService(email, password);
      login(data.user, data.token);
      if (data.user.role === "admin") {
        navigate("/admin/questions");
      } else {
        navigate("/exams");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🎓 English Test</h1>
        <h2 style={styles.title}>Đăng nhập</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Đăng nhập
          </button>
        </form>
        <p style={styles.registerText}>
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  logo: {
    fontSize: "28px",
    color: "#3f51b5",
    marginBottom: "10px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 16px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "#3f51b5",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  registerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
};
