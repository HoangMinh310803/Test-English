import axios from "axios";
import { API_URL } from "../constants/api";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

export const fetchExams = async () => {
  const res = await axios.get(`${API_URL}/api/all-exams`);
  return res.data.exams;
};

export const fetchExamDetail = async (examId) => {
  const res = await axios.get(`${API_URL}/api/exams/${examId}`);
  return res.data.exam;
};

export const createQuestion = async (data) => {
  const token = getToken();
  return await axios.post(`${API_URL}/api/create/question`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createExam = async (data) => {
  const token = getToken();
  return await axios.post(`${API_URL}/api/create/exams`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchQuestions = async () => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/api/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.questions;
};

export const submitResult = async (exam_id, score) => {
  const token = getToken();
  await axios.post(
    `${API_URL}/api/save-result`,
    { exam_id, score },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
