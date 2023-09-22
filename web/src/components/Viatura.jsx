import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "./Input";
import Col from "react-bootstrap/Col";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Localizacao from "../components/Localizacao";
export function Viatura(props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [modalLocale, setModalLocale] = useState(false);
    const location = { lat: -15.6014, lng: -56.0979 };

    async function editViatura(data) {
        await props.editViatura({ ...data, id: props.viatura.id_viatura });
        setIsUpdated(false);
    }
    return (
        <>
            <td>{props.viatura.marca}</td>
            <td>{props.viatura.modelo}</td>
            <td>{props.viatura.kilometragem}</td>
            <td>{props.viatura.chassi}</td>
            <td>{props.viatura.piloto}</td>
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
                        <Dropdown.Item onClick={props.removeViatura}>
                            <div className="d-flex">
                                <DeleteOutlineOutlinedIcon className="me-2"></DeleteOutlineOutlinedIcon>
                                Apagar
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
                        <Row className="d-flex align-items-start mb-4">
                            <Col sm={6}>
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
                            <Col sm={6}>
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

                        <Row className="d-flex align-items-start mb-4">
                            <Col sm={6}>
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
                            <Col sm={6}>
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

                        <Row className="d-flex align-items-start mb-3">
                            <Col sm={6}>
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
                            <Col sm={6}>
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

                        <Row className="d-flex align-items-start mb-3">
                            <Col sm={6}>
                                <Input
                                    type="number"
                                    label="Kilometragem:*"
                                    defaultValue={props.viatura.kilometragem}
                                    placeholder="Informe a quantidade de km rodados do carro:"
                                    required={true}
                                    name="kilometragem"
                                    error={errors.kilometragem}
                                    validations={register("kilometragem", {
                                        required: {
                                            value: true,
                                            message:
                                                "A kilometragem é um campo obrigatório",
                                        },
                                    })}
                                />
                            </Col>
                            <Col sm={6}>
                                <Input
                                    type="text"
                                    defaultValue={props.viatura.piloto}
                                    label="Piloto:*"
                                    placeholder="Informe o nome do piloto:"
                                    required={true}
                                    name="piloto"
                                    error={errors.piloto}
                                    validations={register("piloto", {
                                        required: {
                                            value: true,
                                            message:
                                                "A kilometragem é um campo obrigatório",
                                        },
                                    })}
                                />
                            </Col>
                        </Row>

                        <Row className="d-flex align-items-start mb-3">
                            <Col sm={6}>
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
                            <Col sm={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Selecione um batalhão:
                                    </Form.Label>
                                    <Form.Select
                                        {...register("batalhao")}
                                        defaultValue={props.viatura.batalhao}
                                        size="lg"
                                    >
                                        <option disabled>
                                            Clique para selecionar um órgão
                                        </option>
                                        <option value={"10b"}>
                                            10º batalhão
                                        </option>
                                        <option value={"11b"}>
                                            11º batalhão
                                        </option>
                                        <option value={"12b"}>
                                            12º batalhão
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
                    <Modal.Title>Editar viatura</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    onSubmit={handleSubmit(editViatura)}
                    validated={!!errors}
                >
                    <Modal.Body>
                        <Row className="">
                            <Col sm={12} style={{ overflow: "auto" }}>
                                <div className="App">
                                    <p className="fs-5 fw-bold">
                                        Mapa com Localização Atual
                                    </p>
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
                </Form>
            </Modal>
        </>
    );
}
