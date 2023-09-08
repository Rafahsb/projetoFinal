import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
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

export function Navigations() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Routes>
                    <Route index path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
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
                                <Viaturas/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/manutencoes"
                        element={
                            <PrivateRoute>
                                <Manutencoes/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/usuarios"
                        element={
                            <PrivateRoute>
                                <Usuarios/>
                            </PrivateRoute>
                        }
                    />
                    
                    
                                
                                
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    );
}
