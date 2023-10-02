import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { RemoveItem } from "../components/RemoveItem";
import { getViaturas } from "../services/viaturas-service";
export function Manutencao(props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const navigate = useNavigate();

    async function editManutencao(data) {
        await props.editManutencao({
            ...data,
            id: props.manutencao.id_manutencao,
        });
        setIsUpdated(false);
    }

    return (
        <>
            <td>{props.manutencao.numero_nota}</td>
            <td
                style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                }}
            >
                {props.manutencao.descricao}
            </td>
            <td>{props.manutencao.preco}</td>
            <td>{props.manutencao.data_manutencao}</td>
            <td>
                {props.manutencao.data_nota ? props.manutencao.data_nota : ""}
            </td>
            <td>{props.manutencao.modelo}</td>
            <td style={{ minWidth: "84.94px" }}>{props.manutencao.placa}</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle
                        className="d-flex p-2 align-items-center"
                        variant="primary"
                        id="dropdown-basic"
                    >
                        <BsThreeDotsVertical></BsThreeDotsVertical>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsUpdated(true)}>
                            <div className="d-flex">
                                <EditOutlinedIcon className="me-2"></EditOutlinedIcon>
                                Editar
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setModalDelete(true)}>
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
                    <Modal.Title>Editar manutenção</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    onSubmit={handleSubmit(editManutencao)}
                    validated={!!errors}
                >
                    <Modal.Body>
                        <Row className="mb-4">
                            <Input
                                size={"sm"}
                                defaultValue={props.manutencao.numero_nota}
                                type="text"
                                label="Nº da nota:*"
                                placeholder="Informe o nº da nota fiscal:"
                                required={true}
                                name="numero_nota"
                                error={errors.numero_nota}
                                validations={register("numero_nota", {
                                    required: {
                                        value: true,
                                        message:
                                            "O número da nota é um campo obrigatório",
                                    },
                                })}
                            />
                        </Row>

                        <Row className="mb-4">
                            <Input
                                size={"sm"}
                                defaultValue={props.manutencao.descricao}
                                type="text"
                                label="Descrição:*"
                                placeholder="Informe o descricao do serviço:"
                                required={true}
                                name="descricao"
                                error={errors.descricao}
                                validations={register("descricao", {
                                    required: {
                                        value: true,
                                        message:
                                            "A descrição é um campo obrigatório",
                                    },
                                })}
                            />
                        </Row>

                        <Row className="mb-4">
                            <Input
                                size={"sm"}
                                defaultValue={props.manutencao.preco}
                                type="text"
                                label="Valor:*"
                                placeholder="Informe o valor do serviço:"
                                required={true}
                                name="preco"
                                error={errors.preco}
                                validations={register("preco", {
                                    required: {
                                        value: true,
                                        message:
                                            "O valor é um campo obrigatório",
                                    },
                                })}
                            />
                        </Row>

                        <Row className="mb-4">
                            <Input
                                size={"sm"}
                                defaultValue={
                                    props.manutencao.data_nota
                                        ? props.manutencao.data_nota
                                              .split("/")
                                              .reverse()
                                              .join("-")
                                        : ""
                                }
                                type="date"
                                label="Data:*"
                                placeholder="Informe a data da realização do serviço:"
                                required={true}
                                name="data"
                                error={errors.data}
                                validations={register("data", {
                                    required: {
                                        value: true,
                                        message:
                                            "A data é um campo obrigatório",
                                    },
                                })}
                            />
                        </Row>
                        <Row className="mb-4">
                            <Form.Group>
                                <Form.Label>Seleciona uma marca:</Form.Label>
                                <Form.Select
                                    {...register("id_viatura")}
                                    size="lg"
                                    defaultValue={props.manutencao.id_viatura}
                                >
                                    <option disabled>
                                        Clique para selecionar a marca
                                    </option>

                                    {props.viaturas.map((viatura) => (
                                        <option
                                            key={viatura.id_viatura}
                                            value={viatura.id_viatura}
                                        >{`${viatura.marca} - ${viatura.modelo} - ${viatura.chassi}`}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
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
            <RemoveItem
                show={modalDelete}
                title={"Excluir manutenção"}
                message={
                    "Deseja realmente excluir a manutenção? Isso afetará os dashboards."
                }
                handleClose={() => setModalDelete(false)}
                remove={props.removeManutencao}
            />
        </>
    );
}
