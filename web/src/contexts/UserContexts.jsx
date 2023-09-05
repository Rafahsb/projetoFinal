import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function login(data) {
        try {
            setLoading(true);
            const result = await api.post("/login", data);
            sessionStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            setAccessToken(result.data.accessToken);
            navigate("/teste");
        } catch (e) {
            setError({
                title: "Houve um erro no login!",
                message: e.response.data.error,
            });
        } finally {
            setLoading(false);
        }
    }

    async function registerUser(data) {
        try {
            const user = await api.post("/register", data);
            sessionStorage.setItem(
                "token",
                JSON.stringify(user.data.accessToken)
            );
            setAccessToken(user.data.accessToken);
            navigate("/foods");
        } catch (e) {
            setError({
                title: "Houve um erro no cadastro!",
                message: e.response.data.error,
            });
        }
    }

    return (
        <UserContext.Provider
            value={{
                accessToken,
                login,
                registerUser,
                error,
                setError,
                loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
