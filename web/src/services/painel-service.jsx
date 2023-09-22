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

export async function getDataDashboard2(ano) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/dashboard2/${ano}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function getDataDashboard3() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/dashboard3", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}
