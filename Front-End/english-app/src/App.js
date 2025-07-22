import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ExamListScreen from "./screens/ExamListScreen";
import ExamDetailScreen from "./screens/ExamDetailScreen";
import CreateQuestion from "./admin/CreateQuestion";
import CreateExam from "./admin/CreateExam";
import HistoryScreen from "./screens/HistoryScreen";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/admin/questions"
            element={
              <AdminRoute>
                <CreateQuestion />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/exams"
            element={
              <AdminRoute>
                <CreateExam />
              </AdminRoute>
            }
          />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/exams/:examId" element={<ExamDetailScreen />} />
          <Route path="/exams" element={<ExamListScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
