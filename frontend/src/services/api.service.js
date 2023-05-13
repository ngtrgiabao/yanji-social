import axios from "axios";
import { BASE_URL } from "../constants/backend.url.constant";

//WORK TO BACKEND
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

const api = axios.create({
    baseURL: BASE_URL,
    ...commonConfig,
});

export default api;
