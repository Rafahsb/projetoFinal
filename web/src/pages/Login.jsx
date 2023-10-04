import { useContext, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import imagem from "../Dashboard.png";
import { Input } from "../components/Input";
import { UserContext } from "../contexts/UserContexts";
import Layout from "../components/Layout";
import ReCAPTCHA from "react-google-recaptcha";
import Notification from "../components/Notification";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const {
        login,
        error,
        setError,
        loading,
        setApiReCaptcha,
        active,
        apiMessage,
        theme,
        setActive,
        setTheme,
    } = useContext(UserContext);

    function alterarThema() {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }
    const googleCaptchaApiKey = process.env.REACT_APP_CAPTCHA_API_KEY;
    return (
        <Layout>
            <Container
                fluid
                className="vw-100 vh-100 d-flex justify-content-center p-0"
            >
                {active && (
                    <Notification
                        variant={apiMessage.variant}
                        message={apiMessage.message}
                        setActive={setActive}
                    />
                )}
                <Modal
                    show={error}
                    title={error?.title}
                    message={error?.message}
                    handleClose={() => setError(null)}
                />

                <Row className="w-100 h-100 ">
                    <Col className=" bg-primary d-none d-md-block">
                        <div className="h-100 d-flex flex-column justify-content-center">
                            <Image src={imagem} fluid />
                        </div>
                    </Col>
                    <Col
                        xs={12}
                        md={6}
                        className="d-flex flex-column justify-content-center align-items-center px-5"
                    >
                        <div
                            className="d-flex  justify-content-end w-100"
                            onClick={() => alterarThema()}
                        >
                            {theme === "light" ? (
                                <>
                                    <VisibilityOffOutlinedIcon
                                        className={
                                            theme === "light"
                                                ? "me-2"
                                                : "me-2 text-light"
                                        }
                                    ></VisibilityOffOutlinedIcon>
                                </>
                            ) : (
                                <>
                                    <VisibilityOutlinedIcon
                                        className={
                                            theme === "light"
                                                ? "me-2"
                                                : "me-2 text-light"
                                        }
                                    ></VisibilityOutlinedIcon>
                                </>
                            )}
                        </div>
                        <h1
                            className={
                                theme === "light"
                                    ? "d-flex text-center mb-4"
                                    : "d-flex text-center mb-4 text-light"
                            }
                        >
                            Via<div className="text-primary">Gestão</div>
                        </h1>
                        <h2
                            className={
                                theme === "light"
                                    ? "w-100 text-left mb-3"
                                    : "w-100 text-left mb-3 text-light"
                            }
                        >
                            Login
                        </h2>
                        <Form
                            className="w-100"
                            noValidate
                            validated={!!errors}
                            onSubmit={handleSubmit(login)}
                        >
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Input
                                    className="mb-4"
                                    label="Matricula"
                                    type="text"
                                    placeholder="Insira a matricula"
                                    error={errors.matricula}
                                    required={true}
                                    name="email"
                                    validations={register("matricula", {
                                        required: {
                                            value: true,
                                            message: "Matricula é obrigatória",
                                        },
                                        pattern: {},
                                    })}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Input
                                    className="mb-4"
                                    label="Senha"
                                    type="password"
                                    placeholder="Insira sua senha"
                                    error={errors.senha}
                                    required={true}
                                    name="password"
                                    validations={register("senha", {
                                        required: {
                                            value: true,
                                            message: "Senha é obrigatório",
                                        },
                                    })}
                                />
                            </Form.Group>

                            <ReCAPTCHA
                                sitekey={googleCaptchaApiKey}
                                onChange={setApiReCaptcha}
                            />
                            <Form.Group
                                className="mb-3 d-flex justify-content-end"
                                controlId="formBasicCheckbox"
                            >
                                <Form.Text>
                                    <p>
                                        <Link
                                            to="/esqueceuSenha"
                                            className="link-underline-primary"
                                        >
                                            Esqueceu senha?
                                        </Link>
                                    </p>
                                </Form.Text>
                            </Form.Group>
                            <Button
                                className="w-100 btn-lg mb-4"
                                variant="primary"
                                type="submit"
                            >
                                Entrar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
