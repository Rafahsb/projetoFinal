import { api } from "./api";

export async function getViaturas() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/viaturas", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function getBuscarViaturas(filtro) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/viaturasBusca/${filtro}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function deleteViatura(id) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.delete(`/viatura/${id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function getTotalViaturas() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/totalViaturas", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function updateViatura(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.put(
        `/viatura/${data.id_viatura}`,
        {
            marca: data.marca,
            modelo: data.modelo,
            chassi: data.chassi,
            portas: data.portas,
            bancos: data.bancos,
            cor: data.cor,
            kilometragem: data.kilometragem,
            orgao_vinculado: data.orgao_vinculado,
            batalhao: data.batalhao,
            piloto: data.piloto,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

export async function createViatura(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.post(
        "/viatura",
        {
            marca: data.marca,
            modelo: data.modelo,
            chassi: data.chassi,
            portas: data.portas,
            bancos: data.bancos,
            cor: data.cor,
            kilometragem: data.kilometragem,
            orgao_vinculado: data.orgao_vinculado,
            batalhao: data.batalhao,
            piloto: data.piloto,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}
