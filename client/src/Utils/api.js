/*
 * Contains functions which call the back-end
 */

import axios from "axios";

const register = (fields) => {
  return axios.post("/api/users/register", fields);
};

const login = (fields) => {
  return axios.post("/api/users/login", fields);
};

const getUser = async () => {
  const response = await axios.get(`/api/users`);
  return response.data;
};

const logOutUser = () => {
  return axios.post("/api/users/logout");
};

const getAllMessages = async () => {
  const response = await axios.get("/api/customers");
  return response.data;
};

export { register, login, getUser, logOutUser, getAllMessages };
