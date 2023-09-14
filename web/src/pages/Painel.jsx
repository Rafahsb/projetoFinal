import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getTotalManutencoes } from "../services/manutencoes-service";

import { getTotalViaturas } from "../services/viaturas-service";

import { getTotalUsuarios } from "../services/usuarios-service";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Input } from "../components/Input";

export function Painel() {
    const [totalManutencoes, setTotalManutencoes] = useState([]);
    const [totalViaturas, setTotalViaturas] = useState({});
    const [totalUsuarios, setTotalUsuarios] = useState({});

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        findTotalManutencoes();
        findTotalViaturas();
        findTotalUsuarios();
        // eslint-disable-next-line
    }, []);

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
            <Head></Head>
            <Row className="vh-100">
                <Col sm={3} md={2}>
                    <Navigation></Navigation>
                </Col>
                <Col sm={7} md={8}>
                    <div>
                        <Row>
                            <Col>
                                <p className="h3 mt-4">Paineis Gerenciais</p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-end my-4">
                            <Col lg={4} md={5} xs={6}>
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
                            <Col lg={4} md={5} xs={6}>
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
                        <Row className="d-flex justify-content-end">
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
                    </div>
                </Col>
            </Row>
        </>
    );
}
