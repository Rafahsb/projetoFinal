import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from "react-bootstrap/Container";
import {
    Modal,
    Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";

import {
    getManutencoes,
    createManutencao,
    updateManutencao,
    deleteManutencao
} from "../services/manutencoes-service";
import { Manutencao } from "../components/Manutencao";
import { BsCheckLg } from "react-icons/bs";

import {
    getViaturas,
} from "../services/viaturas-service";

export function Manutencoes() {
    const [manutencoes, setManutencoes] = useState([]);
    const [viaturas, setViaturas] = useState([]);

    const [isCreated, setIsCreated] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findManutencoes();
        // eslint-disable-next-line
    }, []);


    async function findViaturas() {
        try {
            const result = await getViaturas()
            setViaturas(result.data.Viaturas);
        } catch (error) {
            console.error(error);
            navigate("/manutencoes");
        }
    }

    async function findManutencoes() {
        try {
            const result = await getManutencoes()
            setManutencoes(result.data.Manutencoes);
        } catch (error) {
            console.error(error);
            navigate("/manutencoes");
        }
    }

    async function addManutencao(data) {
        try {
            await createManutencao(data);
            setIsCreated(false);
            await findManutencoes();
        } catch (error) {
            console.error(error);
        }
    }

    async function removeManutencao(id) {
        try {
            await deleteManutencao(id);
            await findManutencoes();
        } catch (error) {
            console.error(error);
        }
    }

    async function editManutencao(data) {
        try {
            await updateManutencao({
                id_manutencao: data.id,
                numero_nota: data.numero_nota,
                descricao: data.descricao,
                preco: data.preco,
                data: data.data,
            });
            await findManutencoes();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Head></Head>
                <Row className="">
                    <Col sm={3} md={2}>
                        <Navigation></Navigation>
                    </Col>
                    <Col sm={7} md={8}>
                        <Row>
                            <Col>
                                <p class="h3 mt-4">Manutenções</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs={12} sm={7}>
                                <InputGroup size="lg">
                                    <Form.Control
                                    placeholder="Buscar"
                                    aria-label="Buscar"
                                    />
                                    <Button variant="primary" id="button-addon2">
                                    Pesquisar
                                    </Button>
                                </InputGroup>
                            </Col>
                            <Col sm={5}>
                                <Row className="d-flex justify-content-end">
                                    <Col sm={8} className="">
                                        <div className="d-grid gap-2">
                                            <Button variant="primary" size="lg" 
                                                onClick={() => {
                                                    setIsCreated(true)
                                                    findViaturas();
                                            }}>
                                                Adicionar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                               
                            </Col>
                        </Row>
                        <Row className="m-0 mt-3">
                            <Card className="p-3 my-3 shadow">
                               
                                    <Table hover>
                                        <thead>
                                            <tr>

                                                <th>Nº da nota</th>
                                                <th>Descricao</th>
                                                <th>Preço</th>
                                                <th>Data</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {manutencoes.map((viatura, index) => (
                                                <tr key={index}>
                                                    <Manutencao
                                                        viatura={viatura}
                                                        removeViatura={async () =>
                                                            await removeManutencao(viatura.id_manutencao)
                                                        }
                                                        editViatura={editManutencao}
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                
                            </Card>
                        </Row>
                        
                        <Modal size="lg" show={isCreated} onHide={() => setIsCreated(false)}>
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
                                        size={'sm'} 
                                        type="text"
                                        label="Nº da nota:*"
                                        placeholder="Informe o nº da nota fiscal:"
                                        required={true}
                                        name="numero_nota"
                                        error={errors.numero_nota}
                                        validations={register("numero_nota", {
                                            required: {
                                                value: true,
                                                message: "O número da nota é um campo obrigatório",
                                            },
                                        })}
                                        />  
                                    </Row>

                                    <Row className="mb-4">
                                       <Input
                                        size={'sm'} 
                                        type="text"
                                        label="Descrição:*"
                                        placeholder="Informe o descricao do serviço:"
                                        required={true}
                                        name="descricao"
                                        error={errors.descricao}
                                        validations={register("descricao", {
                                            required: {
                                                value: true,
                                                message: "A descrição é um campo obrigatório",
                                            },
                                        })}
                                        />  
                                    </Row>

                                    <Row className="mb-4">
                                       <Input
                                        size={'sm'} 
                                        type="text"
                                        label="Valor:*"
                                        placeholder="Informe o valor do serviço:"
                                        required={true}
                                        name="preco"
                                        error={errors.preco}
                                        validations={register("preco", {
                                            required: {
                                                value: true,
                                                message: "O valor é um campo obrigatório",
                                            },
                                        })}
                                        />  
                                    </Row>

                                    <Row className="mb-4">
                                       <Input
                                        size={'sm'} 
                                        type="date"
                                        label="Data:*"
                                        placeholder="Informe a data da realização do serviço:"
                                        required={true}
                                        name="data"
                                        error={errors.data}
                                        validations={register("data_nota", {
                                            required: {
                                                value: true,
                                                message: "A data é um campo obrigatório",
                                            },
                                        })}
                                        />  
                                    </Row>
                                    <Row className="mb-4">
                                    <Form.Group >
                                                <Form.Label>
                                                    Seleciona uma marca:
                                                </Form.Label>
                                                <Form.Select {...register("id_viatura")}  size="lg"  >
                                                    <option disabled>Clique para selecionar a marca</option>
                                                    
                                                    {viaturas.map((viatura, index) => ( 
                                                        <option value={viatura.id_viatura}>{`${viatura.marca} - ${viatura.modelo} - ${viatura.chassi}`}</option>
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
