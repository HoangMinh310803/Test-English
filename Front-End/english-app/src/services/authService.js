import axios from "axios";
import { API_URL } from "../constants/api";

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const register = async (username, email, password) => {
  const res = await axios.post(`${API_URL}/auth/register`, {
    username,
    email,
    password,
  });
  return res.data;
};
