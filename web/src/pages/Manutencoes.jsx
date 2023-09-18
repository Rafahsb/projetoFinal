import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Modal, Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import {
    getManutencoes,
    createManutencao,
    updateManutencao,
    deleteManutencao,
    getBuscarManutencoes,
} from "../services/manutencoes-service";
import { Manutencao } from "../components/Manutencao";

import { getViaturas } from "../services/viaturas-service";
import Notification from "../components/Notification";
import PaginationComponent from "../components/PaginationComponent";

export function Manutencoes() {
    const [viaturas, setViaturas] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [apiMessage, setApiMessage] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    let paginaAtual = 1;
    const [totalPages, setTotalPages] = useState();

    const [active, setActive] = useState(false);
    const [manutencoesList, setManutencoesList] = useState([]);

    const [isCreated, setIsCreated] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        filterManutencoes();
        // findViaturas();
        // eslint-disable-next-line
    }, []);

    async function goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            paginaAtual = pageNumber;
            setCurrentPage(pageNumber);
            const filter = { filtro: inputValue, page: paginaAtual };
            const result = await getBuscarManutencoes(filter);
            setManutencoesList(result.data.Manutencoes);
            setTotalPages(result.data.TotalPages);
        }
    }

    async function filterManutencoes(params) {
        const filter = { filtro: params, page: paginaAtual };
        try {
            const result = await getBuscarManutencoes(filter);
            setManutencoesList(result.data.Manutencoes);
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
            navigate("/manutencoes");
        }
    }

    async function findManutencoes() {
        try {
            const result = await getManutencoes();
            setManutencoesList(result.data.Manutencoes);
        } catch (error) {
            console.error(error);
            navigate("/manutencoes");
        }
    }

    async function addManutencao(data) {
        try {
            const result = await createManutencao(data);

            setIsCreated(false);
            setCurrentPage(1);
            await filterManutencoes();

            setApiMessage(result.data);
            setActive(true);
        } catch (error) {
            setApiMessage(error.response.data.error);
            setActive(true);
        }
    }

    async function removeManutencao(id) {
        try {
            await deleteManutencao(id);

            setCurrentPage(1);
            await filterManutencoes();

            setApiMessage({
                message: "Manutenção deletada com sucesso!",
                variant: "success",
            });
            setActive(true);
        } catch (error) {
            setApiMessage(error.response.data.error);
            setActive(true);
        }
    }

    async function editManutencao(data) {
        try {
            const result = await updateManutencao({
                id_manutencao: data.id,
                numero_nota: data.numero_nota,
                descricao: data.descricao,
                preco: data.preco,
                data: data.data,
                id_viatura: data.id_viatura,
            });

            setCurrentPage(1);
            await filterManutencoes();

            setApiMessage(result.data);
            setActive(true);
        } catch (error) {
            console.log(error);
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
            <Row className="gx-0">
                <Col sm={3} md={2} className="border-end">
                    <Navigation></Navigation>
                </Col>
                <Col sm={7} md={8} className="p-3">
                    <Row>
                        <Col>
                            <p className="h3 mt-4">Listar manutenções</p>
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
                                        filterManutencoes(inputValue);
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
                                            onClick={() => {
                                                setIsCreated(true);
                                                findViaturas();
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
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Nº da nota</th>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th>Data</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Chassi</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {manutencoesList.map((manutencao) => (
                                        <tr key={manutencao.id_manutencao}>
                                            <Manutencao
                                                manutencao={manutencao}
                                                removeManutencao={async () =>
                                                    await removeManutencao(
                                                        manutencao.id_manutencao
                                                    )
                                                }
                                                editManutencao={editManutencao}
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
                            <Modal.Title>Cadastrar nova manutenção</Modal.Title>
                        </Modal.Header>
                        <Form
                            noValidate
                            onSubmit={handleSubmit(addManutencao)}
                            validated={!!errors}
                        >
                            <Modal.Body>
                                {/*
                                                <th>Descricao</th>
                                                <th>Preço</th>
                                                <th>Data</th>
                                               */}
                                <Row className="mb-4">
                                    <Input
                                        size={"sm"}
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
                                        type="date"
                                        label="Data:*"
                                        placeholder="Informe a data da realização do serviço:"
                                        required={true}
                                        name="datdataa_nota"
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
                                        <Form.Label>
                                            Seleciona uma marca:
                                        </Form.Label>
                                        <Form.Select
                                            {...register("id_viatura")}
                                            size="lg"
                                        >
                                            <option disabled>
                                                Clique para selecionar a marca
                                            </option>

                                            {viaturas.map((viatura, index) => (
                                                <option
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
