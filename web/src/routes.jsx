import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return children;
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
