import axios from "axios";

const globalApi = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
});

export default globalApi;
