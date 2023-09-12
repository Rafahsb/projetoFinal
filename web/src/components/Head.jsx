import Navbar from "react-bootstrap/Navbar";
import { useContext, useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/Menu";
import Perfil from "../avatar.png";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContexts";
import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
import {
    getUsuario
} from "../services/usuarios-service";

export function Head() {
    const navigate = useNavigate();

    useEffect(() => {
        Logado();
        // eslint-disable-next-line
    }, []);
   
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [usuario, setUsuario] = useState({
        matricula: '',
        email: '',
        unidade: '',
        cargo: ''
    });
    const { id, logout, logged } = useContext(UserContext);
    const [isUpdated, setIsUpdated] = useState(false);
    
    const alterarRota = (() => {
        navigate('/painel');
    }) 
    
    async function Logado() {
        try {
            const result = await getUsuario(id)
            console.log(result)
            setUsuario(result.data.Usuario);
            
        } catch (error) {
            console.error(error);
            Navigate("/painel");
        }
    }

    return (
        <>
            <Navbar className="bg-body-tertiary p-0 shadow">
                <Container fluid>
                    <Navbar.Brand className="d-flex align-items-center ">
                        <HomeOutlinedIcon className="text-primary me-3 fs-2"></HomeOutlinedIcon>
                        <h3 className="d-flex" style={{cursor: 'pointer'}} onClick={alterarRota}>
                            Via <div className="text-primary">Gestão</div>
                        </h3>
                    </Navbar.Brand>
                    <Navbar.Brand className="d-flex align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                <Image src={Perfil} className="w-50" fluid />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={ () => {
                                    setIsUpdated(true);
                                    }}>Perfil</Dropdown.Item>
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
                                defaultValue={usuario.matricula}
                                // onChange={(e) => {
                                //     setUsuario({...usuario, matricula: e.target.value})
                                // }}
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
                                defaultValue={usuario.email}
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
                                defaultValue={usuario.unidade}
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
                                defaultValue={usuario.cargo}
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
