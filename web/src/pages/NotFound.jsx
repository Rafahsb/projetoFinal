import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";
import { Button, Col, Container, Form, Card, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
export function NotFound() {
    const navigate = useNavigate();
    return (
        <Layout key={2}>
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-100 d-flex justify-content-center">
                    <Col lg={6}>
                        <Card className="shadow p-2">
                            <Card.Body>
                                <Card.Title className="mb-3">
                                    Erro 404 - Página não encontrada
                                </Card.Title>
                                <Card.Text>
                                    Desculpe, a página que você está procurando
                                    não existe. Aperte no botão "Voltar" para
                                    ser redirecionado para a tela de login.
                                </Card.Text>
                            </Card.Body>
                            <div className="d-flex justify-content-end">
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="primary"
                                >
                                    Voltar
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
