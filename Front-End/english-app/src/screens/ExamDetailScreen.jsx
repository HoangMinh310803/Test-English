import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchExamDetail, submitResult } from "../services/examService";

export default function ExamDetailScreen() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const intervalRef = useRef(null);

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

  const handleChoose = (qid, optId) => {
    setAnswers({ ...answers, [qid]: optId });
  };

  const handleSubmit = async () => {
    if (isSubmitted) return; // Tránh nộp lại nếu đã nộp

    let correct = 0;
    exam.questions.forEach((q) => {
      if (answers[q._id] === q.correct_answer) correct++;
    });
    const finalScore = correct;

    try {
      await submitResult(exam._id, finalScore);
      alert("✅ Bài thi đã được lưu!");
    } catch (err) {
      console.error("Lỗi khi lưu kết quả:", err.response?.data || err.message);
      alert("❌ Không thể lưu kết quả bài thi.");
    }

    setScore(finalScore);
    setIsSubmitted(true);

    // Dừng đếm thời gian
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (exam) {
      const totalSeconds = exam.duration * 60;
      setTimeLeft(totalSeconds);
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isSubmitted) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timeLeft, isSubmitted]);

  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      alert("⏰ Hết giờ! Bài thi sẽ được tự động nộp.");
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  if (!exam) return <p style={styles.loading}>Đang tải đề...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{exam.title}</h2>
      <p style={styles.description}>{exam.description}</p>
      <p style={{ textAlign: "center", fontWeight: "bold", color: "red" }}>
        ⏰ Thời gian còn lại: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      {exam.questions.map((q, idx) => (
        <div key={q._id} style={styles.questionCard}>
          <p style={styles.questionText}>
            <strong>Câu {idx + 1}:</strong> {q.question_text}
          </p>
          <div style={styles.options}>
            {q.options.map((opt, i) => {
              const isSelected = answers[q._id] === opt.id;
              const isCorrect = opt.id === q.correct_answer;
              const isAnswered = score !== null;

              let optionStyle = { ...styles.optionLabel };
              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = {
                    ...optionStyle,
                    color: "green",
                    fontWeight: "bold",
                  };
                } else if (isSelected && !isCorrect) {
                  optionStyle = {
                    ...optionStyle,
                    color: "red",
                    textDecoration: "line-through",
                  };
                }
              }

              return (
                <label key={i} style={optionStyle}>
                  <input
                    type="radio"
                    name={String(q._id)}
                    value={opt.id}
                    checked={isSelected}
                    disabled={score !== null}
                    onChange={() => handleChoose(q._id, opt.id)}
                    style={styles.radio}
                  />
                  {opt.text}
                </label>
              );
            })}
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
