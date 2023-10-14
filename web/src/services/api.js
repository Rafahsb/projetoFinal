import axios from "axios";

export const api = axios.create({
    // baseURL: "http://15.229.74.145:8080",
    baseURL: "http://52.67.249.100:8080",
    headers: {
        "Content-Type": "application/json",
    },
});
