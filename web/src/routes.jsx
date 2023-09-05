import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Painel } from "./pages/Painel";
import { UserContextProvider } from "./contexts/UserContexts";
import { isAuthenticated } from "./utils/is-authenticated";

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
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    );
}
