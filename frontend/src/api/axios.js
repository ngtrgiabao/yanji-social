import axios from "axios";

//WORK TO BACKEND
export default axios.create({
    baseURL: "https://yanji-social.onrender.com/api/v1",
});
