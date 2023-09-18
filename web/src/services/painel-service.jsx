import { api } from "./api";

export async function getDataDashboard() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/dashboard", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}