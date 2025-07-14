import { useState, useEffect } from "react";
import { createExam, fetchQuestions } from "../services/examService";

export default function CreateExam() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions();
        setQuestionList(questions || []);
      } catch (err) {
        alert(
          "Lỗi tải câu hỏi: " + (err.response?.data?.message || err.message)
        );
      }
    };
    loadQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExam({
        title,
        description,
        questions: selectedIds,
      });
      alert("✅ Tạo đề thi thành công!");
      setTitle("");
      setDescription("");
      setSelectedIds([]);
    } catch (err) {
      alert(
        "❌ Lỗi tạo đề thi: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 Tạo đề thi mới</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Tên đề thi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <h4 style={{ marginTop: "16px" }}>✅ Chọn câu hỏi:</h4>
        <ul style={styles.list}>
          {questionList.map((q) => (
            <li key={q._id} style={styles.listItem}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(q._id)}
                  onChange={() => handleSelect(q._id)}
                />{" "}
                {q.question_text}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit" style={styles.button}>
          Tạo đề thi
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#3f51b5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  textarea: {
    padding: "12px",
    minHeight: "100px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "0",
    marginBottom: "20px",
  },
  listItem: {
    marginBottom: "8px",
  },
  button: {
    padding: "12px",
    background: "#3f51b5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
