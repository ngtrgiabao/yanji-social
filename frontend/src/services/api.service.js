import axios from "axios";

//WORK TO BACKEND
const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SOCKET_URL}/api/v1`,
  ...commonConfig,
});

export default api;
