import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { isAuthenticatedQuery } from "./utils/is-authenticated";
import { EsqueceuSenha } from "./pages/EsqueceuSenha";
import { AlterarSenha } from "./pages/AlterarSenha";
import { Login } from "./pages/Login";
import { Painel } from "./pages/Painel";
import { UserContextProvider } from "./contexts/UserContexts";
import { isAuthenticated } from "./utils/is-authenticated";
import { Viaturas } from "./pages/Viaturas";
import { Manutencoes } from "./pages/Manutencoes";
import { Usuarios } from "./pages/Usuarios";
import { validaToken } from "./services/validator-service";
import { useEffect, useState } from 'react';

function PrivateRoute({ children }) {
    const accessToken = sessionStorage.getItem("token");
    const [token, setToken] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      (async () => {
        try {
           await validaToken(accessToken);
           setToken(true);
        } catch (error) {
            navigate("/");
        }
      })()
    }, [accessToken]);
    

    if (!accessToken) {
        navigate("/");
        return null;
      }

    if(token){
        return children;
    }
  }

export function PrivateRouteQuery({ children }) {
    if (!isAuthenticatedQuery()) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Routes>
                    <Route index path="/" element={<Login />} />
                    <Route
                        path="/painel"
                        element={
                            <PrivateRoute>
                                <Painel />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/viaturas"
                        element={
                            <PrivateRoute>
                                <Viaturas />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/manutencoes"
                        element={
                            <PrivateRoute>
                                <Manutencoes />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/usuarios"
                        element={
                            <PrivateRoute>
                                <Usuarios />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
                    <Route
                        path="/alterarSenha"
                        element={
                            <PrivateRouteQuery>
                                <AlterarSenha />
                            </PrivateRouteQuery>
                        }
                    />
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    );
}
