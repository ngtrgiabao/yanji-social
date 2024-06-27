import axios from "axios";
import Global from "../constant/global";

//WORK TO BACKEND
const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const api = axios.create({
  baseURL: `${Global.SOCKET_URL}/api/v1`,
  ...commonConfig,
});

export default api;
