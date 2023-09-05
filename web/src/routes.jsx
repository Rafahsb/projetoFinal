import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Teste } from "./pages/Teste";
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
                        path="/teste"
                        element={
                            <PrivateRoute>
                                <Teste />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    );
}
