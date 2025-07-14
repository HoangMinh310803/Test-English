import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExamDetail } from "../services/examService";

export default function ExamDetailScreen() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchExamDetail(examId);
        setExam(data);
      } catch (err) {
        console.error(
          "Lỗi khi fetch đề thi:",
          err.response?.data || err.message
        );
      }
    };
    load();
  }, [examId]);

  const handleChoose = (qid, opt) => {
    setAnswers({ ...answers, [qid]: opt });
  };

  const handleSubmit = () => {
    let correct = 0;
    exam.questions.forEach((q) => {
      if (answers[q._id] === q.correct_answer) correct++;
    });
    setScore(correct);
  };

  if (!exam) return <p style={styles.loading}>Đang tải đề...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{exam.title}</h2>
      <p style={styles.description}>{exam.description}</p>

      {exam.questions.map((q, idx) => (
        <div key={q._id} style={styles.questionCard}>
          <p style={styles.questionText}>
            <strong>Câu {idx + 1}:</strong> {q.question_text}
          </p>
          <div style={styles.options}>
            {q.options.map((opt) => (
              <label key={opt} style={styles.optionLabel}>
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  checked={answers[q._id] === opt}
                  onChange={() => handleChoose(q._id, opt)}
                  style={styles.radio}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} style={styles.button}>
        Nộp bài
      </button>

      {score !== null && (
        <div style={styles.result}>
          ✅ Kết quả: {score}/{exam.questions.length}
        </div>
      )}
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
    marginBottom: "10px",
    color: "#3f51b5",
  },
  description: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#555",
  },
  questionCard: {
    background: "#fff",
    padding: "20px",
    marginBottom: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  questionText: {
    marginBottom: "10px",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
  },
  radio: {
    transform: "scale(1.2)",
  },
  button: {
    marginTop: "20px",
    background: "#3f51b5",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  result: {
    marginTop: "30px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#388e3c",
  },
  loading: {
    padding: "40px",
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
};
