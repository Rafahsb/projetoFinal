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
import { Modal, Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import {
    getViaturas,
    createViatura,
    updateViatura,
    deleteViatura,
    getBuscarViaturas,
} from "../services/viaturas-service";
import { Viatura } from "../components/Viatura";
import Notification from "../components/Notification";
import PaginationComponent from "../components/PaginationComponent";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContexts";
export function Viaturas() {
    const [active, setActive] = useState(false);
    const [apiMessage, setApiMessage] = useState({});
    const [viaturas, setViaturas] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    let paginaAtual = 1;
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const { menu } = useContext(UserContext);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        filterViaturas();
        // eslint-disable-next-line
    }, []);

    async function goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            paginaAtual = pageNumber;
            setCurrentPage(pageNumber);
            const filter = { filtro: inputValue, page: paginaAtual };
            const result = await getBuscarViaturas(filter);
            setViaturas(result.data.Viaturas);
            setTotalPages(result.data.TotalPages);
        }
    }

    async function filterViaturas(params) {
        const filter = { filtro: params, page: paginaAtual };
        try {
            const result = await getBuscarViaturas(filter);
            setViaturas(result.data.Viaturas);
            setTotalPages(result.data.TotalPages);
        } catch (error) {
            console.error(error);
        }
    }

    async function findViaturas() {
        try {
            const result = await getViaturas();
            setViaturas(result.data.Viaturas);
        } catch (error) {
            console.error(error);
            navigate("/viaturas");
        }
    }

    async function addViatura(data) {
        try {
            const result = await createViatura(data);
            setIsCreated(false);
            setCurrentPage(1);
            await filterViaturas();
            setApiMessage(result.data);
            setActive(true);
        } catch (error) {
            setApiMessage(error.response.data.error);
            setActive(true);
        }
    }

    async function removeViatura(id) {
        try {
            await deleteViatura(id);

            setCurrentPage(1);
            await filterViaturas();

            setApiMessage({
                message: "Viatura deletada com sucesso!",
                variant: "success",
            });
            setActive(true);
        } catch (error) {
            setApiMessage(error.response.data.error);
            setActive(true);
        }
    }

    async function editViatura(data) {
        try {
            const result = await updateViatura({
                id_viatura: data.id,
                marca: data.marca,
                modelo: data.modelo,
                chassi: data.chassi,
                placa: data.placa,
                portas: data.portas,
                bancos: data.bancos,
                cor: data.cor,
                kilometragem: data.kilometragem,
                orgao_vinculado: data.orgao_vinculado,
                piloto: data.piloto,
            });
            setCurrentPage(1);
            await filterViaturas();
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
                            <p className="h3 mt-4">Listar viaturas</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={12} sm={7} className="mb-3 mb-sm-3">
                            <InputGroup size="lg">
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
                                        filterViaturas(inputValue);
                                        setCurrentPage(1);
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
                                            onClick={() => setIsCreated(true)}
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
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Kilometragem</th>
                                        <th>Placa</th>
                                        <th>Piloto</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viaturas.map((viatura) => (
                                        <tr key={viatura.id_viatura}>
                                            <Viatura
                                                viatura={viatura}
                                                removeViatura={async () =>
                                                    await removeViatura(
                                                        viatura.id_viatura
                                                    )
                                                }
                                                editViatura={editViatura}
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
                            <Modal.Title>Cadastrar nova viatura</Modal.Title>
                        </Modal.Header>
                        <Form
                            noValidate
                            onSubmit={handleSubmit(addViatura)}
                            validated={!!errors}
                        >
                            <Modal.Body>
                                <Row className="d-flex align-items-start mb-4">
                                    <Col sm={6} className="mb-3 mb-sm-0">
                                        <Form.Group>
                                            <Form.Label>
                                                Seleciona uma marca:
                                            </Form.Label>
                                            <Form.Select
                                                {...register("marca")}
                                                size="lg"
                                            >
                                                <option disabled>
                                                    Clique para selecionar a
                                                    marca
                                                </option>
                                                <option value={"Chevrolet"}>
                                                    Chevrolet
                                                </option>
                                                <option value={"Fiat"}>
                                                    Fiat
                                                </option>
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
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label>
                                                Seleciona uma cor:
                                            </Form.Label>
                                            <Form.Select
                                                {...register("cor")}
                                                size="lg"
                                            >
                                                <option disabled>
                                                    Clique para selecionar uma
                                                    cor
                                                </option>
                                                <option value={"Preto"}>
                                                    Preto
                                                </option>
                                                <option value={"Branco"}>
                                                    Branco
                                                </option>
                                                <option value={"Azul"}>
                                                    Azul
                                                </option>
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
                                    </Col>
                                </Row>

                                <Row className="d-flex align-items-start mb-4">
                                    <Col sm={6} className="mb-3 mb-sm-0">
                                        {" "}
                                        <Input
                                            size={"sm"}
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
                                                pattern: {
                                                    value: /^[0-9]{17}$/,
                                                    message:
                                                        "O chassi deve conter exatamente 17 dígitos numéricos.",
                                                },
                                            })}
                                        />
                                    </Col>
                                </Row>

                                <Row className="d-flex align-items-start mb-3">
                                    <Col sm={6} className="mb-3 mb-sm-0">
                                        <Input
                                            type="number"
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
                                                max: {
                                                    value: 6,
                                                    message:
                                                        "A quantidade de portas não pode ser maior que 6",
                                                },
                                            })}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Input
                                            type="number"
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
                                                max: {
                                                    value: 8,
                                                    message:
                                                        "A quantidade de bancos não pode ser maior que 8",
                                                },
                                            })}
                                        />
                                    </Col>
                                </Row>

                                <Row className="d-flex align-items-start mb-3">
                                    <Col sm={6} className="mb-3 mb-sm-0">
                                        <Input
                                            type="number"
                                            label="Kilometragem:*"
                                            placeholder="Informe a quantidade de km rodados do carro:"
                                            required={true}
                                            name="kilometragem"
                                            error={errors.kilometragem}
                                            validations={register(
                                                "kilometragem",
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "A kilometragem é um campo obrigatório",
                                                    },
                                                    max: {
                                                        value: 1000000,
                                                        message:
                                                            "A quilometragem não pode ser maior que 1 milhão",
                                                    },
                                                }
                                            )}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Input
                                            type="text"
                                            label="Piloto:*"
                                            placeholder="Informe o nome do piloto:"
                                            required={true}
                                            name="piloto"
                                            error={errors.piloto}
                                            validations={register("piloto", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "O nome do piloto é um campo obrigatório",
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "O nome do piloto deve ter pelo menos 3 caracteres",
                                                },
                                            })}
                                        />
                                    </Col>
                                </Row>

                                <Row className="d-flex align-items-start mb-3">
                                    <Col sm={6} className="mb-3 mb-sm-0">
                                        <Form.Group>
                                            <Form.Label >
                                                Selecione um órgão:
                                            </Form.Label>
                                            <Form.Select
                                                {...register("orgao_vinculado")}
                                                size="lg"
                                            >
                                                <option disabled>
                                                    Clique para selecionar um
                                                    órgão
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
                                    </Col>
                                    <Col sm={6}>
                                        <Input
                                        type="text"
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
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="danger"
                                    onClick={() => setIsCreated(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button variant="success" type="submit">
                                    Adicionar
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </Col>
            </Row>
        </>
    );
}
