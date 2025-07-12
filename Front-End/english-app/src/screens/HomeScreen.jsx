import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const exams = [
    {
      id: 1,
      title: "English Grammar Test",
      description: "Kiểm tra kiến thức ngữ pháp cơ bản.",
    },
    {
      id: 2,
      title: "Vocabulary Challenge",
      description: "Bài kiểm tra từ vựng thường gặp.",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🎓 English Test</h1>
        <h2 style={styles.greeting}>Chào mừng, {user?.username}!</h2>

        <div style={styles.section}>
          <h3 style={styles.subTitle}>📋 Danh sách đề thi</h3>
          {exams.map((exam) => (
            <div key={exam.id} style={styles.examBox}>
              <div>
                <strong>{exam.title}</strong>
                <p>{exam.description}</p>
              </div>
              <button
                style={styles.startBtn}
                onClick={() => alert(`Chuyển sang thi: ${exam.title}`)}
              >
                Bắt đầu thi
              </button>
            </div>
          ))}
        </div>

        {user?.role === "admin" && (
          <div style={styles.section}>
            <h3 style={styles.subTitle}>🛠 Quản trị</h3>
            <button
              style={styles.adminBtn}
              onClick={() => navigate("/admin/questions")}
            >
              Quản lý câu hỏi
            </button>
            <button
              style={styles.adminBtn}
              onClick={() => navigate("/admin/exams")}
            >
              Quản lý đề thi
            </button>
          </div>
        )}

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Đăng xuất
        </button>
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
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  logo: {
    fontSize: "28px",
    color: "#3f51b5",
    textAlign: "center",
    marginBottom: "10px",
  },
  greeting: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#333",
  },
  section: {
    marginBottom: "24px",
  },
  subTitle: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#444",
  },
  examBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  startBtn: {
    padding: "8px 12px",
    background: "#3f51b5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  adminBtn: {
    padding: "10px 16px",
    marginRight: "10px",
    background: "#009688",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  logoutBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#f44336",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
