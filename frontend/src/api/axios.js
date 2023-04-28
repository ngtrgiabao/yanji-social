import axios from "axios";

//WORK TO BACKEND
export default axios.create({
    baseURL: "http://localhost:8000",
});
