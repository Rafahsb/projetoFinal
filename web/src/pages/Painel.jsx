import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import Container from "react-bootstrap/Container";
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
import { getDataDashboard } from "../services/painel-service";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContexts";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Input } from "../components/Input";

export function Painel() {
    const { menu } = useContext(UserContext);

    const data = [
        {
            name: "Page A",
            Veiculo: 4000,
        },
        {
            name: "Page B",
            Veiculo: 3000,
        },
        {
            name: "Page C",
            Veiculo: 2000,
        },
        {
            name: "Page D",
            Veiculo: 2780,
        },
        {
            name: "Page E",
            Veiculo: 1890,
        },
        {
            name: "Page F",
            Veiculo: 2390,
        },
        {
            name: "Page G",
            Veiculo: 3490,
        },
    ];
    const [totalManutencoes, setTotalManutencoes] = useState([]);
    const [totalViaturas, setTotalViaturas] = useState({});
    const [totalUsuarios, setTotalUsuarios] = useState({});
    const [listDashboard, setListDashboard] = useState({});

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
        // eslint-disable-next-line
    }, []);

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
            Navigate("/painel");
        }
    }

    async function findTotalManutencoes() {
        try {
            const result = await getTotalManutencoes();
            setTotalManutencoes(result);
        } catch (error) {
            console.error(error);
            Navigate("/painel");
        }
    }

    async function findTotalUsuarios() {
        try {
            const result = await getTotalUsuarios();
            setTotalUsuarios(result.data);
        } catch (error) {
            console.error(error);
            Navigate("/painel");
        }
    }

    async function findTotalViaturas() {
        try {
            const result = await getTotalViaturas();
            setTotalViaturas(result.data);
        } catch (error) {
            console.error(error);
            Navigate("/painel");
        }
    }

    return (
        <>
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
                            <p className="h3 mt-4">Paineis Gerenciais</p>
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
                    <Row className="d-flex justify-content-end mb-3">
                        <Col xs={4} sm={5} md={4} lg={3} xl={2}>
                            <Input
                                size={"sm"}
                                type="date"
                                label="Data:*"
                                placeholder="Informe a data da realização do serviço:"
                                required={true}
                                name="data"
                                error={errors.data}
                                validations={register("data_dashboard", {
                                    required: {
                                        value: true,
                                        message:
                                            "A data é um campo obrigatório",
                                    },
                                })}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="">
                            <Card
                                style={{ minHeight: "400px" }}
                                className="p-2 shadow"
                            >
                                <p className="h4 my-3 text-center">
                                    Gastos em manutenções / Viatura
                                </p>
                                <ResponsiveContainer width="100%" height="100%">
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
                                        <Bar dataKey="Total" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}
