import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { Modal, Card, Pagination } from "react-bootstrap";
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
import Notification from "../components/Notification";
import PaginationComponent from "../components/PaginationComponent";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContexts";
export function Usuarios() {
    let page = 1;
    let paginaAtual = 1;
    const [totalPages, setTotalPages] = useState(1);
    const [apiMessage, setApiMessage] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [usuarios, setUsuarios] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [active, setActive] = useState(false);
    const { menu } = useContext(UserContext);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        filterUsuarios();
        // eslint-disable-next-line
    }, []);

    async function goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            paginaAtual = pageNumber;
            setCurrentPage(pageNumber);
            const filter = { filtro: inputValue, page: paginaAtual };
            const result = await getBuscarUsuarios(filter);
            setUsuarios(result.data.Usuarios);
            setTotalPages(result.data.TotalPages);
        }
    }

    async function filterUsuarios(params) {
        const filter = { filtro: params, page: paginaAtual };
        try {
            const result = await getBuscarUsuarios(filter);
            setUsuarios(result.data.Usuarios);
            setTotalPages(result.data.TotalPages);
        } catch (error) {
            console.error(error);
        }
    }

    async function findUsuarios() {
        try {
            const result = await getUsuarios(page);
            setUsuarios(result.data.Usuarios);
            setTotalPages(result.data.totalpages);
        } catch (error) {
            console.error(error);
            navigate("/usuarios");
        }
    }

    async function addUsuario(data) {
        try {
            const result = await createUsuario(data);

            setIsCreated(false);
            setCurrentPage(1);
            await filterUsuarios();

            setApiMessage(result.data);
            setActive(true);
        } catch (error) {
            setApiMessage(error.response.data.error);
            setActive(true);
        }
    }

    async function removeUsuario(id) {
        try {
            await deleteUsuario(id);

            setCurrentPage(1);
            await filterUsuarios();

            setApiMessage({
                message: "Usuário deletado com sucesso!",
                variant: "success",
            });
            setActive(true);
        } catch (error) {
            setApiMessage(error.response.data.error);
            setActive(true);
        }
    }

    async function editUsuario(data) {
        try {
            const result = await updateUsuario({
                id_usuario: data.id,
                matricula: data.matricula,
                nome: data.nome,
                senha: data.senha,
                email: data.email,
                unidade: data.unidade,
                cargo: data.cargo,
            });

            setCurrentPage(1);
            await filterUsuarios();
            setApiMessage(result.data);
            setActive(true);
        } catch (error) {
            setApiMessage(error.response.data.error);
            setActive(true);
        }
    }

    return (
        <>
            {active && (
                <Notification
                    variant={apiMessage.variant}
                    message={apiMessage.message}
                    setActive={setActive}
                />
            )}

            <Head></Head>
            <Row className={menu ? "d-flex justify-content-center" : "gx-0"}>
                {menu ? (
                    <></>
                ) : (
                    <Col sm={4} md={3} lg={2} className="border-end">
                        <Navigation></Navigation>
                    </Col>
                )}
                <Col sm={menu ? 9 : 8} className="p-3">
                    <Row>
                        <Col>
                            <p className="h3 mt-4">Listar usuários</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={12} sm={7}>
                            <InputGroup size="lg" className="mb-3 mb-sm-3">
                                <Form.Control
                                    placeholder="Buscar"
                                    aria-label="Buscar"
                                    error={errors.buscar}
                                    value={inputValue}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                    name="buscar"
                                    validations={register("filtro", {
                                        pattern: {},
                                    })}
                                />
                                <Button
                                    onClick={() => {
                                        setCurrentPage(1);
                                        filterUsuarios(inputValue);
                                    }}
                                    variant="primary"
                                    id="button-addon2"
                                >
                                    Pesquisar
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col sm={5}>
                            <Row className="d-flex justify-content-end">
                                <Col sm={8} className="">
                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={() => {
                                                setIsCreated(true);
                                                findUsuarios();
                                            }}
                                        >
                                            Adicionar
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="m-0 mt-3">
                        <Card className="p-3 my-3 shadow">
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Matrícula</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Unidade</th>
                                        <th>Cargo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.id_usuario}>
                                            <Usuario
                                                usuario={usuario}
                                                removeUsuario={async () =>
                                                    await removeUsuario(
                                                        usuario.id_usuario
                                                    )
                                                }
                                                editUsuario={editUsuario}
                                            />
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                            />
                        </Card>
                    </Row>

                    <Modal
                        size="lg"
                        show={isCreated}
                        onHide={() => setIsCreated(false)}
                    >
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
                                        size={"sm"}
                                        type="text"
                                        label="Matricula:*"
                                        placeholder="Informe o nº da matricula:"
                                        required={true}
                                        name="matricula"
                                        error={errors.matricula}
                                        validations={register("matricula", {
                                            required: {
                                                value: true,
                                                message:
                                                    "O número da matricula é um campo obrigatório",
                                            },
                                            pattern: {
                                                value: /^\d{9}$/, // Padrão para exatamente 9 dígitos
                                                message:
                                                    "A matrícula deve ter exatamente 9 dígitos",
                                            },
                                        })}
                                    />
                                </Row>

                                <Row className="mb-4">
                                    <Input
                                        size={"sm"}
                                        type="text"
                                        label="Nome:*"
                                        placeholder="Informe o nome do servidor:"
                                        required={true}
                                        name="nome"
                                        error={errors.nome}
                                        validations={register("nome", {
                                            required: {
                                                value: true,
                                                message:
                                                    "O nome é um campo obrigatório",
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "O nome do usuário deve ter pelo menos 3 caracteres",
                                            },
                                        })}
                                    />
                                </Row>

                                <Row className="mb-4">
                                    <Input
                                        size={"sm"}
                                        type="email" // Usar o tipo "email"
                                        label="E-mail:*"
                                        placeholder="Informe o email:"
                                        required={true}
                                        name="email"
                                        error={errors.email}
                                        validations={register("email", {
                                            required: {
                                                value: true,
                                                message:
                                                    "O e-mail é um campo obrigatório",
                                            },
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message:
                                                    "Por favor, insira um endereço de e-mail válido",
                                            },
                                        })}
                                    />
                                </Row>

                                <Row className="mb-4">
                                    <Input
                                        size={"sm"}
                                        type="text"
                                        label="Unidade:*"
                                        placeholder="Informe a unidade:"
                                        required={true}
                                        name="unidade"
                                        error={errors.unidade}
                                        validations={register("unidade", {
                                            required: {
                                                value: true,
                                                message:
                                                    "A unidade é um campo obrigatório",
                                            },
                                        })}
                                    />
                                </Row>

                                <Row className="mb-4">
                                    <Form.Group>
                                        <Form.Label>
                                            Seleciona uma marca:
                                        </Form.Label>
                                        <Form.Select
                                            {...register("cargo")}
                                            size="lg"
                                        >
                                            <option disabled>
                                                Clique para selecionar a marca
                                            </option>
                                            <option value={"Admin"}>
                                                Administrador
                                            </option>
                                            <option value={"Usuario"}>
                                                Usuário
                                            </option>
                                        </Form.Select>
                                    </Form.Group>
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
