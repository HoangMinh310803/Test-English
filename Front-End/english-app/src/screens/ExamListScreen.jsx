// src/screens/ExamListScreen.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExams } from "../services/examService";

export default function ExamListScreen() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchExams();
      setExams(data);
    };
    load();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Danh sách đề thi</h2>
      {exams.map((exam) => (
        <div key={exam._id} style={styles.card}>
          <h3>{exam.title}</h3>
          <p>{exam.description}</p>
          <button
            style={styles.button}
            onClick={() => navigate(`/exams/${exam._id}`)}
          >
            Bắt đầu thi
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#f0f4ff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#3f51b5",
  },
  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  button: {
    background: "#3f51b5",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
