import { useEffect, useState } from "react";
import { getHistoryResults } from "../services/examService";

export default function HistoryScreen() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getHistoryResults();
      setResults(data.results);
    };
    load();
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ color: "#3f51b5" }}>📚 Lịch sử bài thi</h2>
      {results.map((r, i) => (
        <div
          key={i}
          style={{
            background: "white",
            marginTop: "16px",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Đề thi: {r.exam_title}</h3>
          <p>Điểm: {r.score}</p>
          <p>Hoàn thành lúc: {new Date(r.completed_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
