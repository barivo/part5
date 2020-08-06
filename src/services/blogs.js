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

const setToken = userToken => {
  token = userToken;
};

export default { getAll, setToken };
