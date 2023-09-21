import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { getTotalManutencoes } from "../services/manutencoes-service";
import { getTotalViaturas } from "../services/viaturas-service";
import { getTotalUsuarios } from "../services/usuarios-service";
import {
    getDataDashboard,
    getDataDashboard2,
} from "../services/painel-service";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContexts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, Tab, Tabs } from "react-bootstrap";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import { Form } from "react-bootstrap";
export function Painel() {
    const currentYear = new Date().getFullYear();
    const { menu } = useContext(UserContext);
    const [key, setKey] = useState("dados");
    const [totalManutencoes, setTotalManutencoes] = useState([]);
    const [totalViaturas, setTotalViaturas] = useState({});
    const [totalUsuarios, setTotalUsuarios] = useState({});
    const [listDashboard, setListDashboard] = useState({});
    const [listDashboard2, setListDashboard2] = useState({});
    const [listDashboard2Year, setListDashboard2Year] = useState("");
    const [selectedYear, setSelectedYear] = useState(null);
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        findTotalManutencoes();
        findTotalViaturas();
        findTotalUsuarios();
        findDataDashboard();
        filterDataDashboard2();
        // eslint-disable-next-line
    }, []);

    const handleYearChange = (date) => {
        setSelectedYear(date);
    };

    async function findDataDashboard() {
        try {
            const result = await getDataDashboard();

            const formattedData = result.data.dashboard.map((item) => ({
                name: `${item.marca} - ${item.modelo} - ${item.chassi}`,
                Total: item.sum,
            }));
            setListDashboard(formattedData);
        } catch (error) {
            console.error(error);
            navigate("/painel");
        }
    }

    async function filterDataDashboard2(data) {
        try {
            const result = await getDataDashboard2(data ? data.ano : "");
            const formattedData = result.data.dashboard2.map((item) => ({
                name: `${item.mes}`,
                Total: item.total_por_mes,
            }));
            setListDashboard2(formattedData);
            setListDashboard2Year(result.data.ano);
        } catch (error) {
            console.error(error);
            navigate("/painel");
        }
    }

    async function findTotalManutencoes() {
        try {
            const result = await getTotalManutencoes();
            setTotalManutencoes(result);
        } catch (error) {
            console.error(error);
            navigate("/painel");
        }
    }

    async function findTotalUsuarios() {
        try {
            const result = await getTotalUsuarios();
            setTotalUsuarios(result.data);
        } catch (error) {
            console.error(error);
            navigate("/painel");
        }
    }

    async function findTotalViaturas() {
        try {
            const result = await getTotalViaturas();
            setTotalViaturas(result.data);
        } catch (error) {
            console.error(error);
            navigate("/painel");
        }
    }

    return (
        <Layout>
            <Head styles={{ overflow: "hidden" }}></Head>
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
                            <p className="h3 mt-4">Painéis Gerenciais</p>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end my-4">
                        <Col
                            lg={4}
                            md={5}
                            sm={6}
                            xs={12}
                            className="mb-3 mb-sm-0"
                        >
                            <Card className="p-4 shadow">
                                <Row>
                                    <Col
                                        className="d-flex align-items-center justify-content-center"
                                        xs={5}
                                    >
                                        <p className="fs-1 m-0 fw-bold">
                                            {" "}
                                            {totalViaturas.Total}
                                        </p>
                                    </Col>
                                    <Col>
                                        <div className="vr h-100"></div>
                                    </Col>
                                    <Col
                                        className="d-flex align-items-center justify-content-center"
                                        xs={5}
                                    >
                                        <p className="m-0">Viaturas</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg={4} md={5} sm={6} xs={12}>
                            <Card className="p-4  shadow">
                                <Row>
                                    <Col
                                        className="d-flex align-items-center justify-content-center"
                                        xs={5}
                                    >
                                        <p className="fs-1 m-0 fw-bold ">
                                            {" "}
                                            {totalUsuarios.Total}
                                        </p>
                                    </Col>
                                    <Col>
                                        <div className="vr h-100"></div>
                                    </Col>
                                    <Col
                                        className="d-flex align-items-center justify-content-center"
                                        xs={5}
                                    >
                                        <p className="m-0">Usuários</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="dados" title="Dados Pessoais">
                                <Col xs={12} className="">
                                    <Card
                                        style={{ height: "500px" }}
                                        className="p-2 shadow"
                                    >
                                        <p className="h4 my-3 text-center">
                                            Gastos em manutenções / viatura
                                        </p>
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={listDashboard}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar
                                                    dataKey="Total"
                                                    fill="#82ca9d"
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Card>
                                </Col>
                            </Tab>

                            <Tab eventKey="teste" title="Dados Pessoais">
                                <Row className="d-flex justify-content-end mb-3">
                                    <Col xs={6} md={5} lg={4} xl={3}>
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit(
                                                filterDataDashboard2
                                            )}
                                            validated={!!errors}
                                            className="d-flex"
                                        >
                                            <Input
                                                size={"sm"}
                                                type="number"
                                                label="Ano:*"
                                                placeholder={`Informe o ano (1980 - ${currentYear})`}
                                                name="ano"
                                                error={errors.ano}
                                                className="me-2"
                                                validations={register("ano", {
                                                    min: {
                                                        value: 1980,
                                                        message:
                                                            "O ano deve ser igual ou maior que 1980",
                                                    },
                                                    max: {
                                                        value: currentYear,
                                                        message: `O ano deve ser igual ou menor que ${currentYear}`,
                                                    },
                                                })}
                                            />
                                            <Button
                                                type="submit"
                                                style={{ maxHeight: "58px" }}
                                            >
                                                Enviar
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                                <Col xs={12} className="">
                                    <Card
                                        style={{ height: "500px" }}
                                        className="p-2 shadow"
                                    >
                                        <p className="h4 my-3 text-center">
                                            Gastos em manutenções / viatura
                                        </p>
                                        <p className="h4 my-3 text-center">
                                            {listDashboard2Year}
                                        </p>

                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={listDashboard2}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar
                                                    dataKey="Total"
                                                    fill="#82ca9d"
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Card>
                                </Col>
                            </Tab>
                        </Tabs>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}
