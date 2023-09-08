import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import HomeOutlinedIcon from "@mui/icons-material/Menu";
import Perfil from "../avatar.png";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContexts";

export function Head() {
    const {
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { logout } = useContext(UserContext);
    return (
        <Navbar className="bg-body-tertiary p-0">
            <Container fluid>
                <Navbar.Brand className="d-flex align-items-center ">
                    <HomeOutlinedIcon className="text-primary me-3 fs-2"></HomeOutlinedIcon>
                    <h3 className="d-flex">
                        Via <div className="text-primary">Gestão</div>
                    </h3>
                </Navbar.Brand>
                <Navbar.Brand className="d-flex align-items-center">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <Image src={Perfil} className="w-50" fluid />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>Perfil</Dropdown.Item>
                            <Dropdown.Item>
                                <div onClick={handleSubmit(logout)}>Logout</div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
