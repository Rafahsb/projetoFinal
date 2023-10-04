import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import React, { useEffect, useState, useContext } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { UserContext } from "../contexts/UserContexts";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
export function Navigation() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const { menu, theme, setTheme } = useContext(UserContext);
    useEffect(() => {
        const handleRouteChange = () => {
            setCurrentPath(window.location.pathname);
        };

        // Adicione um ouvinte para detectar alterações de rota
        window.addEventListener("popstate", handleRouteChange);

        return () => {
            // Remova o ouvinte quando o componente for desmontado
            window.removeEventListener("popstate", handleRouteChange);
        };
    }, []);

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row
                className={
                    theme === "light"
                        ? "vh-sm-100 p-0 pt-4 w-100 ms-0 justify-content-center bg-light"
                        : "vh-sm-100 p-0 pt-4 w-100 ms-0 justify-content-center bg-dark"
                }
            >
                <Col sm={12}>
                    <Nav
                        variant="pills"
                        className="flex-column align-items-center text-center"
                    >
                        <Nav.Item className="w-100">
                            <Nav.Link
                                href="/painel"
                                className={
                                    currentPath === "/painel" ? "active" : ""
                                }
                            >
                                <div className="d-flex">
                                    <SpaceDashboardOutlinedIcon className="me-2"></SpaceDashboardOutlinedIcon>
                                    Painel
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="w-100">
                            <Nav.Link
                                href="/viaturas"
                                className={
                                    currentPath === "/viaturas" ? "active" : ""
                                }
                            >
                                <div className="d-flex">
                                    <DirectionsCarOutlinedIcon className="me-2"></DirectionsCarOutlinedIcon>
                                    Viaturas
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="w-100">
                            <Nav.Link
                                href="/manutencoes"
                                className={
                                    currentPath === "/manutencoes"
                                        ? "active"
                                        : ""
                                }
                            >
                                <div className="d-flex">
                                    <HandymanOutlinedIcon className="me-2"></HandymanOutlinedIcon>
                                    Manutenções
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="w-100">
                            <Nav.Link
                                href="/usuarios"
                                className={
                                    currentPath === "/usuarios" ? "active" : ""
                                }
                            >
                                <div className="d-flex">
                                    <PeopleAltOutlinedIcon className="me-2"></PeopleAltOutlinedIcon>
                                    Usuários
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Tab.Container>
    );
}
