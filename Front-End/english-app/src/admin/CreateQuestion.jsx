import { useState } from "react";
import { createQuestion } from "../services/examService";
import { useNavigate } from "react-router-dom";

export default function CreateQuestion() {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuestion({
        question_text: questionText,
        options,
        correct_answer: correctAnswer,
      });

      alert("Tạo câu hỏi thành công!");
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      navigate("/admin/exams");
    } catch (err) {
      alert("Lỗi tạo câu hỏi: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Tạo câu hỏi mới</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nội dung câu hỏi"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
          style={styles.input}
        />
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Lựa chọn ${index + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[index] = e.target.value;
              setOptions(newOpts);
            }}
            required
            style={styles.input}
          />
        ))}
        <input
          type="text"
          placeholder="Đáp án đúng"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Tạo câu hỏi
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#3f51b5",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "14px 16px",
    marginBottom: "16px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontSize: "16px",
    transition: "border 0.3s, box-shadow 0.3s",
  },
  button: {
    padding: "14px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#2c3e91",
  },
};
