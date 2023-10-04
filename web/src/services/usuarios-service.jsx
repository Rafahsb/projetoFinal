import { api } from "./api";

export async function resetPassword(data) {
    const result = await api.post(`/requestSenha`, {
        matricula: data.matricula,
    });
    return result;
}

export async function editResetPassword(data) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("token");
    const result = await api.post(
        `/alterarSenha`,
        {
            nova_senha: data.nova_senha,
            confirmar_nova_senha: data.confirmar_nova_senha,
            token: accessToken,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return result;
}

export async function editPassword(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.put(
        `/senha/${data.id_usuario}`,
        {
            senha: data.senha,
            nova_senha: data.nova_senha,
            confirmar_nova_senha: data.confirmar_nova_senha,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

export async function getTotalUsuarios() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/totalUsuarios", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function getBuscarUsuarios(params) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(
        `/usuariosBusca/?filtro=${params.filtro}&page=${params.page}`,
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

export async function getUsuarios(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/usuarios/${data}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function getUsuario() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get(`/usuario/${accessToken}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function deleteUsuario(id) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.delete(`/usuario/${id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function updateUsuario(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.put(
        `/usuario/${data.id_usuario}`,
        {
            matricula: data.matricula,
            email: data.email,
            unidade: data.unidade,
            cargo: data.cargo,
            nome: data.nome,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

export async function createUsuario(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.post(
        "/usuario",
        {
            matricula: data.matricula,
            nome: data.nome,
            email: data.email,
            unidade: data.unidade,
            cargo: data.cargo,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}
