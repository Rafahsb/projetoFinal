import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import Col from "react-bootstrap/Col";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Localizacao from "../components/Localizacao";
import { RemoveItem } from "../components/RemoveItem";
import { getViaturaHistorico } from "../services/viaturas-service";
import { saveAs } from "file-saver";

export function Viatura(props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [modalLocale, setModalLocale] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalRelatorios, setModalRelatorios] = useState(false);
    const [key, setKey] = useState("1");
    const [isView, setIsView] = useState(false);
    const location = { lat: props.viatura.lat, lng: props.viatura.long };

    async function viaturaHistorico() {
        try {
            const response = await getViaturaHistorico(
                props.viatura.id_viatura
            );
            const base64Data = response.data.data;
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, "RelatorioKilometragem.xlsx");
        } catch (error) {
            return console.error(error);
        }
    }

    async function editViatura(data) {
        await props.editViatura({ ...data, id: props.viatura.id_viatura });
        setIsUpdated(false);
    }
    return (
        <>
            <td>{props.viatura.marca}</td>
            <td>{props.viatura.modelo}</td>
            <td>{props.viatura.quilometragem}</td>
            <td style={{ minWidth: "84.94px" }}>{props.viatura.placa}</td>
            <td>{props.viatura.piloto}</td>
            <td>{props.viatura.status}</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
                        <Dropdown.Item onClick={() => setModalRelatorios(true)}>
                            <div className="d-flex">
                                <PlagiarismOutlinedIcon className="me-2"></PlagiarismOutlinedIcon>
                                Relatórios
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div
                                className="d-flex"
                                onClick={() => setModalLocale(true)}
                            >
                                <LocationOnIcon className="me-2"></LocationOnIcon>
                                Localização
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
                        <Tab Tab eventKey="1" title="Dados Viatura 1">
                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Form.Group>
                                        <Form.Label>Marca:</Form.Label>
                                        <Form.Select
                                            defaultValue={props.viatura.marca}
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
                                            defaultValue={props.viatura.cor}
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
                                    {" "}
                                    <Input
                                        size={"sm"}
                                        defaultValue={props.viatura.modelo}
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
                                        defaultValue={props.viatura.chassi}
                                        placeholder="Informe o chassi do carro:"
                                        name="chassi"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="number"
                                        defaultValue={props.viatura.portas}
                                        label="Portas:*"
                                        placeholder="Informe a quantidade de portas do carro:"
                                        name="portas"
                                    />
                                </fieldset>
                            </Row>
                        </Tab>
                        <Tab Tab eventKey="2" title="Dados viatura 2">
                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="number"
                                        defaultValue={props.viatura.bancos}
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
                                            props.viatura.quilometragem
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
                                        defaultValue={props.viatura.piloto}
                                        label="Motorista:"
                                        placeholder="Informe o nome do motorista:"
                                        name="piloto"
                                    />
                                </fieldset>
                            </Row>

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Input
                                        type="text"
                                        defaultValue={props.viatura.placa}
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
                                                props.viatura.orgao_vinculado
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

                            <Row className="mb-4">
                                <fieldset disabled>
                                    <Form.Group>
                                        <Form.Label>Status:</Form.Label>
                                        <Form.Select
                                            defaultValue={props.viatura.status}
                                            size="lg"
                                        >
                                            <option disabled>
                                                Clique para selecionar um órgão
                                            </option>
                                            <option value={"manutencao"}>
                                                Manutenção
                                            </option>
                                            <option value={"garagem"}>
                                                Garagem
                                            </option>
                                            <option value={"patrulha"}>
                                                Patrulha
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
                    <Modal.Title>Editar viatura</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    onSubmit={handleSubmit(editViatura)}
                    validated={!!errors}
                >
                    <Modal.Body>
                        <Row className="d-flex align-items-start mb-0 mb-sm-3">
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Form.Group>
                                    <Form.Label>
                                        Seleciona uma marca:
                                    </Form.Label>
                                    <Form.Select
                                        {...register("marca")}
                                        defaultValue={props.viatura.marca}
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
                                        <option value={"Toyota"}>Toyota</option>
                                        <option value={"Renault"}>
                                            Renault
                                        </option>
                                        <option value={"Honda"}>Honda</option>
                                        <option value={"Nissan  "}>
                                            Nissan
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Form.Group>
                                    <Form.Label>Seleciona uma cor:</Form.Label>
                                    <Form.Select
                                        {...register("cor")}
                                        defaultValue={props.viatura.cor}
                                        size="lg"
                                    >
                                        <option disabled>
                                            Clique para selecionar uma cor
                                        </option>
                                        <option value={"Preto"}>Preto</option>
                                        <option value={"Branco"}>Branco</option>
                                        <option value={"Azul"}>Azul</option>
                                        <option value={"Vermelho"}>
                                            Vermelho
                                        </option>
                                        <option value={"Cinza"}>Cinza</option>
                                        <option value={"Prata"}>Prata</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="d-flex align-items-start mb-0 mb-sm-3">
                            <Col sm={6} className="mb-3 mb-sm-0">
                                {" "}
                                <Input
                                    size={"sm"}
                                    defaultValue={props.viatura.modelo}
                                    type="text"
                                    label="Modelo:*"
                                    placeholder="Informe o modelo do carro:"
                                    required={true}
                                    name="modelo"
                                    error={errors.modelo}
                                    validations={register("modelo", {
                                        required: {
                                            value: true,
                                            message:
                                                "O modelo é um campo obrigatória",
                                        },
                                    })}
                                />
                            </Col>
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Input
                                    type="text"
                                    label="Chassi:*"
                                    defaultValue={props.viatura.chassi}
                                    placeholder="Informe o chassi do carro:"
                                    required={true}
                                    name="chassi"
                                    error={errors.chassi}
                                    validations={register("chassi", {
                                        required: {
                                            value: true,
                                            message:
                                                "O chassi é um campo obrigatória",
                                        },
                                    })}
                                />
                            </Col>
                        </Row>

                        <Row className="d-flex align-items-start mb-0 mb-sm-3">
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Input
                                    type="number"
                                    defaultValue={props.viatura.portas}
                                    label="Portas:*"
                                    placeholder="Informe a quantidade de portas do carro:"
                                    required={true}
                                    name="portas"
                                    error={errors.portas}
                                    validations={register("portas", {
                                        required: {
                                            value: true,
                                            message:
                                                "A quantidade de portas é um campo obrigatória",
                                        },
                                    })}
                                />
                            </Col>
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Input
                                    type="number"
                                    defaultValue={props.viatura.bancos}
                                    label="Bancos:*"
                                    placeholder="Informe a quantidade de bancos do carro:"
                                    required={true}
                                    name="bancos"
                                    error={errors.bancos}
                                    validations={register("bancos", {
                                        required: {
                                            value: true,
                                            message:
                                                "A quantidade de bancos é um campo obrigatório",
                                        },
                                    })}
                                />
                            </Col>
                        </Row>

                        <Row className="d-flex align-items-start mb-0 mb-sm-3">
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Input
                                    type="number"
                                    label="quilometragem:*"
                                    defaultValue={props.viatura.quilometragem}
                                    placeholder="Informe a quantidade de km rodados do carro:"
                                    required={true}
                                    name="quilometragem"
                                    error={errors.quilometragem}
                                    validations={register("quilometragem", {
                                        required: {
                                            value: true,
                                            message:
                                                "A quilometragem é um campo obrigatório",
                                        },
                                    })}
                                />
                            </Col>
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Input
                                    type="text"
                                    defaultValue={props.viatura.piloto}
                                    label="Motorista:"
                                    placeholder="Informe o nome do motorista:"
                                    required={true}
                                    name="piloto"
                                    error={errors.piloto}
                                    validations={register("piloto", {
                                        minLength: {
                                            value: 3,
                                            message:
                                                "O nome do motorista deve possuir ao menos 3 caracteres",
                                        },
                                    })}
                                />
                            </Col>
                        </Row>
                        <Row className="d-flex align-items-start mb-0 mb-sm-3">
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Input
                                    type="text"
                                    defaultValue={props.viatura.placa}
                                    label="Placa:*"
                                    placeholder="Informe a placa do carro:"
                                    required={true}
                                    name="placa"
                                    error={errors.placa}
                                    validations={register("placa", {
                                        required: {
                                            value: true,
                                            message:
                                                "A placa é um campo obrigatório",
                                        },
                                        pattern: {
                                            value: /^[A-Z]{3}-(\d{4}|\d[A-Z]\d{2})$/,
                                            message:
                                                "A placa deve estar no seguinte formato LLL-N(N/L)NN",
                                        },
                                    })}
                                />
                            </Col>
                        </Row>
                        <Row className="d-flex align-items-start">
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Form.Group>
                                    <Form.Label>Selecione um órgão:</Form.Label>
                                    <Form.Select
                                        {...register("orgao_vinculado")}
                                        defaultValue={
                                            props.viatura.orgao_vinculado
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
                                        <option value={"Ex"}>Exército</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={6} className="mb-3 mb-sm-0">
                                <Form.Group>
                                    <Form.Label>
                                        Selecione um status:
                                    </Form.Label>
                                    <Form.Select
                                        {...register("status")}
                                        defaultValue={props.viatura.status}
                                        size="lg"
                                    >
                                        <option disabled>
                                            Clique para selecionar um órgão
                                        </option>
                                        <option value={"manutencao"}>
                                            Manutenção
                                        </option>
                                        <option value={"garagem"}>
                                            Garagem
                                        </option>
                                        <option value={"patrulha"}>
                                            Patrulha
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
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
            <Modal
                size="lg"
                show={modalLocale}
                onHide={() => setModalLocale(false)}
            >
                <Modal.Header>
                    <Modal.Title>Localização Atual</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="">
                        <Col sm={12} style={{ overflow: "auto" }}>
                            <div className="App">
                                <Localizacao
                                    lat={location.lat}
                                    lng={location.lng}
                                />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setModalLocale(false)}
                    >
                        Voltar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="lg"
                show={modalRelatorios}
                onHide={() => setModalLocale(false)}
            >
                <Modal.Header>
                    <Modal.Title>Relatórios</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="">
                        <Col sm={6}>
                            <Card style={{ width: "18rem" }}>
                                <Card.Body>
                                    <Card.Title>
                                        Relatório de kilometragem
                                    </Card.Title>
                                    <Card.Text>
                                        Relatório com todo o histórico de
                                        kilometragem da viatura.
                                    </Card.Text>
                                    <Button onClick={() => viaturaHistorico()}>
                                        Baixar relatório
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setModalRelatorios(false)}
                    >
                        Voltar
                    </Button>
                </Modal.Footer>
            </Modal>
            <RemoveItem
                show={modalDelete}
                title={"Excluir viatura"}
                message={`Deseja realmente excluir a viatura? Todo o histórico de alterações na kilometragem será perdido,
                 além de afetar os dashboards.`}
                handleClose={() => setModalDelete(false)}
                remove={props.removeViatura}
            />
        </>
    );
}
