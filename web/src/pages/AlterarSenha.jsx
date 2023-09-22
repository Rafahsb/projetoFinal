import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { Button, Col, Container, Form, Card, Modal } from "react-bootstrap";
import { editResetPassword } from "../services/usuarios-service";
import Layout from "../components/Layout";
import { useState } from "react";
export function AlterarSenha() {
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
            const result = await editResetPassword(params);
            console.log("result");
            setTitle("Aleterar Senha");
            setMessage(result.data.message);
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
        <Layout key={2}>
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-100 d-flex justify-content-center">
                    <Col sm={6}>
                        <Card className="shadow p-2">
                            <Card.Body>
                                <Card.Title className="mb-3">
                                    Alterar senha
                                </Card.Title>
                                <Card.Text></Card.Text>
                                <Form
                                    noValidate
                                    validated={!!errors}
                                    onSubmit={handleSubmit(requestPassword)}
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Row className="mb-4">
                                            <Input
                                                size={"sm"}
                                                type="password"
                                                label="Nova senha:*"
                                                placeholder="Informe a nova senha:"
                                                required={true}
                                                name="nova_senha"
                                                error={errors.new_senha}
                                                validations={register(
                                                    "nova_senha",
                                                    {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                "A nova senha é um campo obrigatório",
                                                        },
                                                    }
                                                )}
                                            />
                                        </Row>
                                        <Row className="mb-4">
                                            <Input
                                                size={"sm"}
                                                type="password"
                                                label="Confirmar nova senha:*"
                                                placeholder="Informe a confirmação da nova senha:"
                                                required={true}
                                                name="confirmar_nova_senha"
                                                error={
                                                    errors.confirmar_nova_senha
                                                }
                                                validations={register(
                                                    "confirmar_nova_senha",
                                                    {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                "A confirmação da nova senha é um campo obrigatório",
                                                        },
                                                    }
                                                )}
                                            />
                                        </Row>
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button type="submit" variant="success">
                                            Alterar
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
