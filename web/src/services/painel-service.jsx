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

export async function getDataDashboardRelatorio() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/dashboardRelatorio", {
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

export async function getDataDashboard2Relatorio(ano) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/dashboard2Relatorio/${ano}`, {
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

export async function getDataDashboard3Relatorio() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/dashboard3Relatorio`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function getDataDashboard4() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/dashboard4", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}
export async function getDataDashboard4Relatorio() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/dashboard4Relatorio`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}


export async function getDataDashboard5() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/dashboard5", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}
export async function getDataDashboard5Relatorio() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/dashboard5Relatorio`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function getTotalStatusViaturas() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/totalStatusViaturas", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}