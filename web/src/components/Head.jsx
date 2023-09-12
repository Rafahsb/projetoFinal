import Navbar from "react-bootstrap/Navbar";
import { useContext, useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/Menu";
import Perfil from "../avatar.png";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Navigate } from "react-router-dom";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContexts";
import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
import {
    getUsuario,
    updateUsuario
} from "../services/usuarios-service";

export function Head() {
    const navigate = useNavigate();

   
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [usuario, setUsuario] = useState({});
    const { user, setUser, logout, logged } = useContext(UserContext);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isUpdated2, setIsUpdated2] = useState(false);
    const [key, setKey] = useState('dados');
    let userId;
    const alterarRota = (() => {
        navigate('/painel');
    }) 

    useEffect(() => {
        logado()
      }, [])

    async function logado() {
        try {
            const result = await getUsuario()
            setUsuario(result.data.Usuario);
            
        } catch (error) {
            console.error(error);
            Navigate("/painel");
        }
    }

    async function editUsuario(data) {
        console.log(usuario);
        try {
            await updateUsuario({
                id_usuario: usuario.id_usuario,
                senha: data.senha,
                email: data.email,
                unidade: data.unidade,
                cargo: data.cargo,
            });
            await logado();
        } catch (error) {
            console.error(error);
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
                <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                >
                    <Tab eventKey="dados" title="Dados Pessoais">
                        <Form
                            noValidate
                            onSubmit={handleSubmit(editUsuario)}
                            validated={!!errors}
                        >  
                            <Modal.Body>   
                                <Row className="mb-4">
                                    {/* <FloatingLabel controlId="floatingPassword" label="Password">
                                        <Form.Control type="password" placeholder="Password" />
                                    </FloatingLabel> */}
                                    <fieldset disabled>
                                        <Input
                                        size={'sm'} 
                                        id="disabledTextInput"
                                        defaultValue={usuario.matricula}        
                                        htmlFor="disabledTextInput"                       
                                        type="text"
                                        label="Matricula:*"
                                        />  
                                    </fieldset>
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

                                <Row className="mb-2">
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
                                {/* <Row>
                                    <a href="#" onClick={() => {
                                        setIsUpdated(false);
                                        setIsUpdated2(true);
                                    }}>Alterar Senha</a>
                                </Row> */}
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
                    </Tab>
                    <Tab eventKey="senha" title="Senha">
                        <Form>
                        <Modal.Body>   
                            <Row className="mb-4">
                                <Input
                                size={'sm'} 
                                defaultValue={usuario.email}
                                type="password"
                                label="Senha:*"
                                placeholder="Informe a sua senha:"
                                required={true}
                                name="email"
                                error={errors.senha}
                                validations={register("senha", {
                                    required: {
                                        value: true,
                                        message: "A senha é um campo obrigatório",
                                    },
                                })}
                                />  
                            </Row>   
                            <Row className="mb-4">
                                <Input
                                size={'sm'} 
                                defaultValue={usuario.email}
                                type="password"
                                label="Nova senha:*"
                                placeholder="Informe a nova senha:"
                                required={true}
                                name="nova_senha"
                                error={errors.new_senha}
                                validations={register("nova_senha", {
                                    required: {
                                        value: true,
                                        message: "A nova senha é um campo obrigatório",
                                    },
                                })}
                                />  
                            </Row> 
                            <Row className="mb-4">
                                <Input
                                size={'sm'} 
                                defaultValue={usuario.email}
                                type="password"
                                label="Confirmar nova senha:*"
                                placeholder="Informe a confirmação da nova senha:"
                                required={true}
                                name="confirmar_nova_senha"
                                error={errors.confirmar_nova_senha}
                                validations={register("confirmar_nova_senha", {
                                    required: {
                                        value: true,
                                        message: "A confirmação da nova senha é um campo obrigatório",
                                    },
                                })}
                                />  
                            </Row> 
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setIsUpdated(true);
                                    setIsUpdated2(false);
                                    }}
                            >
                                Voltar
                            </Button>
                            <Button variant="success" type="submit">
                                Editar
                                </Button>
                        </Modal.Footer>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal>
        </>
    );
}
