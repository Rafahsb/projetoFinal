import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from "react-bootstrap/Container";
import {
    Modal,
    Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";

import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getBuscarUsuarios,
} from "../services/usuarios-service";
import { Usuario } from "../components/Usuario";
import { BsCheckLg } from "react-icons/bs";


export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findUsuarios();
        // eslint-disable-next-line
    }, []);

    
    async function filterUsuarios(params) {
        try {
            const result = await getBuscarUsuarios(params)
            setUsuarios(result.data.Usuarios);
        } catch (error) {
            console.error(error);
        }
    }

    async function findUsuarios() {
        try {
            const result = await getUsuarios()
            setUsuarios(result.data.Usuarios);
        } catch (error) {
            console.error(error);
            navigate("/usuarios");
        }
    }

    async function addUsuario(data) {
        try {
            await createUsuario(data);
            setIsCreated(false);
            await findUsuarios();
        } catch (error) {
            console.error(error);
        }
    }

    async function removeUsuario(id) {
        try {
            await deleteUsuario(id);
            await findUsuarios();
        } catch (error) {
            console.error(error);
        }
    }

    async function editUsuario(data) {
        try {
            await updateUsuario({
                id_usuario: data.id,
                matricula: data.matricula, 
                senha: data.senha,
                email: data.email,
                unidade: data.unidade,
                cargo: data.cargo,
            });
            await findUsuarios();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Head></Head>
                <Row className="">
                    <Col sm={3} md={2}>
                        <Navigation></Navigation>
                    </Col>
                    <Col sm={7} md={8}>
                        <Row>
                            <Col>
                                <p className="h3 mt-4">Usuários</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs={12} sm={7}>
                                
                                <InputGroup size="lg">
                                    <Form.Control
                                    placeholder="Buscar"
                                    aria-label="Buscar"
                                    error={errors.buscar}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    name="buscar"
                                    validations={register("filtro", {
                                        pattern: {},
                                    })}
                                    />
                                    <Button onClick={() => filterUsuarios(inputValue)} variant="primary" id="button-addon2">
                                        Pesquisar
                                    </Button>
                                </InputGroup>
                                    
                            </Col>
                            <Col sm={5}>
                                <Row className="d-flex justify-content-end">
                                    <Col sm={8} className="">
                                        <div className="d-grid gap-2">
                                            <Button variant="primary" size="lg" 
                                                onClick={() => {
                                                    setIsCreated(true)
                                                    findUsuarios();
                                            }}>
                                                Adicionar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                               
                            </Col>
                        </Row>
                        <Row className="m-0 mt-3">
                            <Card className="p-3 my-3 shadow">
                               
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Matrícula</th>
                                                <th>E-mail</th>
                                                <th>Unidade</th>
                                                <th>Cargo</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {usuarios.map((usuario, index) => (
                                                <tr key={index}>
                                                    <Usuario
                                                        usuario={usuario}
                                                        removeUsuario={async () =>
                                                            await removeUsuario(usuario.id_usuario)
                                                        }
                                                        editUsuario={editUsuario}
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                
                            </Card>
                        </Row>
                        
                        <Modal size="lg" show={isCreated} onHide={() => setIsCreated(false)}>
                            <Modal.Header>
                                <Modal.Title>Cadastrar usuário</Modal.Title>
                            </Modal.Header>
                            <Form
                                noValidate
                                onSubmit={handleSubmit(addUsuario)}
                                validated={!!errors}
                            >
                                <Modal.Body>
                                    <Row className="mb-4">
                                       <Input
                                        size={'sm'} 
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
                                        onClick={() => setIsCreated(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button variant="success" type="submit">
                                        Cadastrar
                                    </Button>
                                    
                                </Modal.Footer>
                            </Form>
                        </Modal>  
                    </Col>
                </Row>
        </>
    );
}
