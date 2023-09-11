import { api } from "./api";

export async function getManutencoes() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/manutencoes', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getBuscarManutencoes(filtro) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/manutencoesBusca/${filtro}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getTotalManutencoes() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/totalManutencoes', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function deleteManutencao(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/manutencao/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateManutencao(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/manutencao/${data.id_manutencao}`, {      
        numero_nota: data.numero_nota,
        descricao: data.descricao,
        preco: data.preco,
        data_nota: data.data,
        id_viatura: data.id_viatura,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createManutencao(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/manutencao', {
        numero_nota: data.numero_nota,
        descricao: data.descricao,
        preco: data.preco,
        data: data.data_nota,
        id_viatura: data.id_viatura,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}