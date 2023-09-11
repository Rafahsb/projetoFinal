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
import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";

export function Head() {
    
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const { logout, logged } = useContext(UserContext);
    const [isUpdated, setIsUpdated] = useState(false);
    

    return (
        <>
            <Navbar className="bg-body-tertiary p-0 shadow">
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
                                <Dropdown.Item onClick={ () => setIsUpdated(true) }>Perfil</Dropdown.Item>
                                <Dropdown.Item onClick={logout}>
                                    <div >Logout</div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Modal size="lg" show={isUpdated} onHide={() => setIsUpdated(false)}>
                    <Modal.Header>
                        <Modal.Title >Editar usuário</Modal.Title>
                    </Modal.Header>
                    <Form
                        noValidate
                        // onSubmit={handleSubmit(editUsuario)}
                        validated={!!errors}
                    >
                        <Modal.Body>
                            <Row className="mb-4">
                                <Input
                                size={'sm'} 
                                // defaultValue={props.usuario.matricula}
                                type="text"
                                label="Matricula:*"
                                placeholder="Informe o nº da matricula:"
                                required={true}
                                name="matricula"
                                error={errors.matricula}
                                validations={register("matricula", {
                                    required: {
                                        value: true,
                                        message: "O número da matricula é um campo obrigatório",
                                    },
                                })}
                                />  
                            </Row>

                            <Row className="mb-4">
                                <Input
                                size={'sm'} 
                                // defaultValue={props.usuario.email}
                                type="email"
                                label="E-mail:*"
                                placeholder="Informe o email:"
                                required={true}
                                name="email"
                                error={errors.email}
                                validations={register("email", {
                                    required: {
                                        value: true,
                                        message: "O e-mail é um campo obrigatório",
                                    },
                                })}
                                />  
                            </Row>

                            <Row className="mb-4">
                                <Input
                                size={'sm'} 
                                // defaultValue={props.usuario.unidade}
                                type="text"
                                label="Unidade:*"
                                placeholder="Informe a unidade:"
                                required={true}
                                name="unidade"
                                error={errors.unidade}
                                validations={register("unidade", {
                                    required: {
                                        value: true,
                                        message: "A unidade é um campo obrigatório",
                                    },
                                })}
                                />  
                            </Row>

                            <Row className="mb-4">
                                <Input
                                size={'sm'} 
                                // defaultValue={props.usuario.cargo}
                                type="text"
                                label="Cargo:*"
                                placeholder="Informe o cargo:"
                                required={true}
                                name="cargo"
                                error={errors.cargo}
                                validations={register("cargo", {
                                    required: {
                                        value: true,
                                        message: "O cargo é um campo obrigatório",
                                    },
                                })}
                                />  
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="danger"
                                onClick={() => setIsUpdated(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="success" type="submit">
                                Editar
                            </Button>
                            
                        </Modal.Footer>
                    </Form>
            </Modal>
        </>
    );
}
