import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Col from "react-bootstrap/Col";

export function Usuario(props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    async function editUsuario(data) {
        await props.editUsuario({ ...data, id: props.usuario.id_usuario });
        setIsUpdated(false);
    }
    return (
        <>
            <td>{props.usuario.matricula}</td>
            <td
                style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                }}
            >
                {props.usuario.nome}
            </td>
            <td
                style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                }}
            >
                {props.usuario.email}
            </td>
            <td
                style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                }}
            >
                {props.usuario.unidade}
            </td>
            <td>{props.usuario.cargo}</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        <BsThreeDotsVertical></BsThreeDotsVertical>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsUpdated(true)}>
                            <div className="d-flex">
                                <EditOutlinedIcon className="me-2"></EditOutlinedIcon>
                                Editar
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={props.removeUsuario}>
                            <div className="d-flex">
                                <DeleteOutlineOutlinedIcon className="me-2"></DeleteOutlineOutlinedIcon>
                                Apagar
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <Modal
                size="lg"
                show={isUpdated}
                onHide={() => setIsUpdated(false)}
            >
                <Modal.Header>
                    <Modal.Title>Editar usuário</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    onSubmit={handleSubmit(editUsuario)}
                    validated={!!errors}
                >
                    <Modal.Body>
                        <Row className="mb-4">
                            <Input
                                size={"sm"}
                                defaultValue={props.usuario.matricula}
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
                                defaultValue={props.usuario.nome}
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
                                defaultValue={props.usuario.email}
                                type="email"
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
                                })}
                            />
                        </Row>

                        <Row className="mb-4">
                            <Input
                                size={"sm"}
                                defaultValue={props.usuario.unidade}
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
                            <Input
                                size={"sm"}
                                defaultValue={props.usuario.cargo}
                                type="text"
                                label="Cargo:*"
                                placeholder="Informe o cargo:"
                                required={true}
                                name="cargo"
                                error={errors.cargo}
                                validations={register("cargo", {
                                    required: {
                                        value: true,
                                        message:
                                            "O cargo é um campo obrigatório",
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
