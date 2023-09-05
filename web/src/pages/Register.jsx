import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { UserContext } from "../contexts/UserContexts";

export function Register() {
    const { registerUser, error, setError, loading } = useContext(UserContext);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    return (
        <Container>
            <Modal
                show={error}
                title={error?.title}
                message={error?.message}
                handleClose={() => setError(null)}
            />
            <Header title="Crie sua conta" />
            <Form
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(registerUser)}
                className="bg-light rounded p-5 shadow col-10 col-md-6 m-auto"
            >
                <Row>
                    <Col>
                        <Input
                            className="mb-4"
                            label="Matricula"
                            type="text"
                            placeholder="Insira a matricula"
                            error={errors.matricula}
                            required={true}
                            name="matricula"
                            validations={register("matricula", {
                                required: {
                                    value: true,
                                    message: "Matricula é obrigatória",
                                },
                                pattern: {
                                    message: "matricula inválido!",
                                },
                            })}
                        />
                        <Input
                            className="mb-4"
                            label="Senha"
                            type="password"
                            placeholder="Insira sua senha"
                            error={errors.senha}
                            required={true}
                            name="senha"
                            validations={register("senha", {
                                required: {
                                    value: true,
                                    message: "Senha é obrigatório",
                                },
                            })}
                        />
                        <div className="d-flex justify-content-between">
                            <Button type="submit">Criar</Button>
                            <Link to="/">Já tenho uma conta</Link>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
