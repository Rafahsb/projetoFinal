import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);
    const [menu, setMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [apiRecaptcha, setApiReCaptcha] = useState("");

    const navigate = useNavigate();

    async function login(data) {
        try {
            setLoading(true);
            const result = await api.post("/login", data);
            const resultVerifyRecaptcha = await api.post("/verify-recaptcha", {
                recaptchaToken: apiRecaptcha,
            });

            sessionStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            setAccessToken(result.data.accessToken);
            navigate("/painel");
        } catch (e) {
            console.log(e);
            if (e.response.status === 429) {
                setError({
                    title: "Houve um erro no login!",
                    message: e.response.data,
                });
            } else {
                setError({
                    title: "Houve um erro no login!",
                    message: e.response.data.error.message,
                });
            }
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
                setUser,
                menu,
                setMenu,
                setApiReCaptcha,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
