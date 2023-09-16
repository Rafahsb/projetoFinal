import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

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
            navigate("/painel");
        } catch (e) {
            setError({
                title: "Houve um erro no login!",
                message: e.response.data.error,
            });
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        sessionStorage.removeItem("token");
        navigate("/");
    }

   

    return (
        <UserContext.Provider
            value={{
                accessToken,
                login,
                error,
                setError,
                loading,
                logout,
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
