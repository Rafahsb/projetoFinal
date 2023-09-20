import { api } from "./api";

export async function validaToken(token) {
    const result = await api.post("/validarToken", {
        token: token,
    });
    return result;
}
