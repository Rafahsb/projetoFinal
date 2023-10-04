import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { RemoveItem } from "../components/RemoveItem";
import { getViaturas } from "../services/viaturas-service";
export function Manutencao(props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [isView, setIsView] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [key, setKey] = useState("1");
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
                        <Dropdown.Item onClick={() => setIsView(true)}>
                            <div className="d-flex">
                                <VisibilityOutlinedIcon className="me-2"></VisibilityOutlinedIcon>
                                Ver Mais
                            </div>
                        </Dropdown.Item>
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
            <Modal size="lg" show={isView} onHide={() => setIsView(false)}>
                <Modal.Header>
                    <Modal.Title>Ver Mais</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab Tab eventKey="1" title="Dados manutenção">
                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        size={"sm"}
                                        defaultValue={
                                            props.manutencao.numero_nota
                                        }
                                        type="text"
                                        label="Nº da nota:*"
                                        placeholder="Informe o nº da nota fiscal:"
                                        name="numero_nota"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        size={"sm"}
                                        defaultValue={
                                            props.manutencao.descricao
                                        }
                                        type="text"
                                        label="Descrição:*"
                                        placeholder="Informe o descricao do serviço:"
                                        name="descricao"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        size={"sm"}
                                        defaultValue={props.manutencao.preco}
                                        type="text"
                                        label="Valor:*"
                                        placeholder="Informe o valor do serviço:"
                                        name="preco"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        size={"sm"}
                                        defaultValue={
                                            props.manutencao.data_manutencao
                                                ? props.manutencao.data_manutencao
                                                      .split("/")
                                                      .reverse()
                                                      .join("-")
                                                : ""
                                        }
                                        type="date"
                                        label="Data Inicial:*"
                                        placeholder="Informe a data inicial do serviço:"
                                        name="data_manutencao"
                                    />
                                </fieldset>
                            </Row>
                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        size={"sm"}
                                        defaultValue={
                                            props.manutencao.data_nota
                                                ? props.manutencao.data_nota
                                                      .split("/")
                                                      .reverse()
                                                      .join("-")
                                                : null
                                        }
                                        type="date"
                                        label="Data final:*"
                                        placeholder="Informe a data final da realização do serviço:"
                                    />
                                </fieldset>
                            </Row>
                        </Tab>
                        <Tab Tab eventKey="2" title="Dados viatura">
                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Form.Group>
                                        <Form.Label>Marca:</Form.Label>
                                        <Form.Select
                                            defaultValue={
                                                props.manutencao.marca
                                            }
                                            size="lg"
                                        >
                                            <option disabled>
                                                Clique para selecionar a marca
                                            </option>
                                            <option value={"Chevrolet"}>
                                                Chevrolet
                                            </option>
                                            <option value={"Fiat"}>Fiat</option>
                                            <option value={"Volkswagen"}>
                                                Volkswagen
                                            </option>
                                            <option value={"Hyundai"}>
                                                Hyundai
                                            </option>
                                            <option value={"Toyota"}>
                                                Toyota
                                            </option>
                                            <option value={"Renault"}>
                                                Renault
                                            </option>
                                            <option value={"Honda"}>
                                                Honda
                                            </option>
                                            <option value={"Nissan  "}>
                                                Nissan
                                            </option>
                                        </Form.Select>
                                    </Form.Group>
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Form.Group>
                                        <Form.Label>Cor:</Form.Label>
                                        <Form.Select
                                            defaultValue={props.manutencao.cor}
                                            size="lg"
                                        >
                                            <option disabled>
                                                Clique para selecionar uma cor
                                            </option>
                                            <option value={"Preto"}>
                                                Preto
                                            </option>
                                            <option value={"Branco"}>
                                                Branco
                                            </option>
                                            <option value={"Azul"}>Azul</option>
                                            <option value={"Vermelho"}>
                                                Vermelho
                                            </option>
                                            <option value={"Cinza"}>
                                                Cinza
                                            </option>
                                            <option value={"Prata"}>
                                                Prata
                                            </option>
                                        </Form.Select>
                                    </Form.Group>
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        size={"sm"}
                                        defaultValue={props.manutencao.modelo}
                                        type="text"
                                        label="Modelo:*"
                                        placeholder="Informe o modelo do carro:"
                                        name="modelo"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="text"
                                        label="Chassi:*"
                                        defaultValue={props.manutencao.chassi}
                                        placeholder="Informe o chassi do carro:"
                                        name="chassi"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="number"
                                        defaultValue={props.manutencao.portas}
                                        label="Portas:*"
                                        placeholder="Informe a quantidade de portas do carro:"
                                        name="portas"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="number"
                                        defaultValue={props.manutencao.bancos}
                                        label="Bancos:*"
                                        placeholder="Informe a quantidade de bancos do carro:"
                                        name="bancos"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="number"
                                        label="quilometragem:*"
                                        defaultValue={
                                            props.manutencao.quilometragem
                                        }
                                        placeholder="Informe a quantidade de km rodados do carro:"
                                        name="quilometragem"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="text"
                                        defaultValue={props.manutencao.placa}
                                        label="Placa:*"
                                        placeholder="Informe a placa do carro:"
                                        name="placa"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Form.Group>
                                        <Form.Label>Órgão:</Form.Label>
                                        <Form.Select
                                            defaultValue={
                                                props.manutencao.orgao_vinculado
                                            }
                                            size="lg"
                                        >
                                            <option disabled>
                                                Clique para selecionar um órgão
                                            </option>
                                            <option value={"PF"}>
                                                Polícia Federal
                                            </option>
                                            <option value={"PM"}>
                                                Polícia Militar
                                            </option>
                                            <option value={"PC"}>
                                                Polícia Cívil
                                            </option>
                                            <option value={"Ex"}>
                                                Exército
                                            </option>
                                        </Form.Select>
                                    </Form.Group>
                                </fieldset>
                            </Row>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setIsView(false)}>
                        Voltar
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                    props.manutencao.data_manutencao
                                        ? props.manutencao.data_manutencao
                                              .split("/")
                                              .reverse()
                                              .join("-")
                                        : ""
                                }
                                type="date"
                                label="Data Inicial:*"
                                placeholder="Informe a data inicial do serviço:"
                                required={true}
                                name="data_manutencao"
                                error={errors.data_manutencao}
                                validations={register("data_manutencao", {
                                    required: {
                                        value: true,
                                        message:
                                            "A data inicial é um campo obrigatório",
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
                                        : null
                                }
                                type="date"
                                label="Data final:*"
                                placeholder="Informe a data final da realização do serviço:"
                                name="data_nota"
                                error={errors.data_nota}
                                validations={register("data_nota")}
                            />
                        </Row>
                        <Row className="mb-4">
                            <fieldset disabled>
                                <Form.Group>
                                    <Form.Select
                                        {...register("id_viatura")}
                                        size="lg"
                                        defaultValue={
                                            props.manutencao.id_viatura
                                        }
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
                            </fieldset>
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
                setModalDelete={setModalDelete}
            />
        </>
    );
}
