import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import { Button, Col, Container, Form, Card, Modal } from "react-bootstrap";
import { resetPassword } from "../services/usuarios-service";
import Layout from "../components/Layout";
export function EsqueceuSenha() {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function requestPassword(params) {
        try {
            await resetPassword(params);
            setTitle("Esqueceu sua senha?");
            setMessage(
                "Foi enviado um e-mail com um link para redefinição de senha! clique em 'ok' para voltar para a tela de login."
            );
            setModal(true);
        } catch (error) {
            setTitle("Esqueceu sua senha?");
            setMessage(
                `${error.response.data.error.message} Clique no 'x' para realizar uma nova tentativa, ou no 'Ok' para voltar para a tela de login.`
            );
            setModal(true);
        }
    }

    function fecharModal() {
        navigate("/");
    }

    return (
        <Layout key={3}>
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-100 d-flex justify-content-center">
                    <Col sm={6}>
                        <Card className="shadow p-2">
                            <Card.Body>
                                <Card.Title className="mb-3">
                                    Esqueceu sua Senha?
                                </Card.Title>
                                <Card.Text>
                                    Será enviado um e-mail com link para
                                    alteração da senha.
                                </Card.Text>
                                <Form
                                    noValidate
                                    validated={!!errors}
                                    onSubmit={handleSubmit(requestPassword)}
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        Informe a sua matricula:
                                        <Input
                                            className="mb-4"
                                            label="Matricula"
                                            type="text"
                                            placeholder="Insira a matricul:"
                                            error={errors.matricula}
                                            required={true}
                                            name="email"
                                            validations={register("matricula", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Matricula é obrigatória",
                                                },
                                                pattern: {},
                                            })}
                                        />
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Link to="/" className="me-3">
                                            <Button variant="danger">
                                                Voltar
                                            </Button>
                                        </Link>

                                        <Button type="submit" variant="success">
                                            Enviar
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Modal show={modal} onHide={() => setModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => fecharModal()}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Layout>
    );
}
