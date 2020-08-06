import axios from "axios";
const baseUrl = "/api/login";

const login = credentials => {
  return axios
    .post(baseUrl, credentials)
    .then(response => response.data)
    .catch(error => {
      console.log("login attempt failed: ", error);
      return null;
    });
};

export default login;
