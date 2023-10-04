import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContexts";
const Layout = ({ children }) => {
    const [clicado, setClicado] = useState(true);
    const { menu, theme, setTheme } = useContext(UserContext);
    return (
        <div>
            <main
                className={theme === "light" ? "bg-light" : "bg-dark"}
                style={{ minHeight: "100vh" }}
            >
                {children}{" "}
                {/* Renderiza a página específica dentro do layout */}
            </main>
        </div>
    );
};

export default Layout;
