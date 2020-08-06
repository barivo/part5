import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then(response => response.data)
    .catch(error => {
      console.log("login attempt failed: ", error);
      return null;
    });
};

const createBlog = blog => {
  return axios
    .post(baseUrl, blog, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(response => response.data)
    .catch(error => {
      console.log("failed to create blog: ", error);
      return null;
    });
};

const setToken = string => {
  token = string;
};

const getToken = () => token;

export default { getAll, setToken, createBlog };
