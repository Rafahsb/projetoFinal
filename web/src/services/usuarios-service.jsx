import { api } from "./api";



export async function getTotalUsuarios() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/totalUsuarios', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getBuscarUsuarios(filtro) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/usuariosBusca/${filtro}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getUsuarios() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/usuarios', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getUsuario(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteUsuario(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateUsuario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/usuario/${data.id_usuario}`, {      
        matricula: data.matricula, 
        senha: data.senha,
        email: data.email,
        unidade: data.unidade,
        cargo: data.cargo,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createUsuario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/usuario', {
        matricula: data.matricula,
        email: data.email,
        unidade: data.unidade,
        cargo: data.cargo,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}