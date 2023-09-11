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
    getViaturas,
    createViatura,
    updateViatura,
    deleteViatura,
    getBuscarViaturas
} from "../services/viaturas-service";
import { Viatura } from "../components/Viatura";
import { BsCheckLg } from "react-icons/bs";

export function Viaturas() {
    const [viaturas, setViaturas] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findViaturas();
        // eslint-disable-next-line
    }, []);

    async function filterViaturas(params) {
        try {
            const result = await getBuscarViaturas(params)
            setViaturas(result.data.Viaturas);
        } catch (error) {
            console.error(error);
        }
    }

    async function findViaturas() {
        try {
            const result = await getViaturas()
            setViaturas(result.data.Viaturas);
        } catch (error) {
            console.error(error);
            navigate("/viaturas");
        }
    }

    async function addViatura(data) {
        try {
            await createViatura(data);
            setIsCreated(false);
            await findViaturas();
        } catch (error) {
            console.error(error);
        }
    }

    async function removeViatura(id) {
        try {
            await deleteViatura(id);
            await findViaturas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editViatura(data) {
        try {
            await updateViatura({
                id_viatura: data.id,
                marca: data.marca,
                modelo: data.modelo,
                chassi: data.chassi,
                portas: data.portas,
                bancos: data.bancos,
                cor: data.cor,
                kilometragem: data.kilometragem,
                orgao_vinculado: data.orgao_vinculado,
                batalhao: data.batalhao,
                piloto: data.piloto,
            });
            await findViaturas();
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
                                <p className="h3 mt-4">Viaturas</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs={12} sm={7}>
                            <InputGroup size="lg">
                                    <Form.Control
                                    placeholder="Buscar"
                                    aria-label="Buscar"
                                    error={errors.buscar}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    name="buscar"
                                    validations={register("filtro", {
                                        pattern: {},
                                    })}
                                    />
                                    <Button onClick={() => filterViaturas(inputValue)} variant="primary" id="button-addon2">
                                        Pesquisar
                                    </Button>
                                </InputGroup>
                            </Col>
                            <Col sm={5}>
                                <Row className="d-flex justify-content-end">
                                    <Col sm={8} className="">
                                        <div className="d-grid gap-2">
                                            <Button variant="primary" size="lg" onClick={() => setIsCreated(true)}>
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
                                                <th>Marca</th>
                                                <th>Modelo</th>
                                                <th>Kilometragem</th>
                                                <th>Chassi</th>
                                                <th>Piloto</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {viaturas.map((viatura, index) => (
                                                <tr key={index}>
                                                    <Viatura
                                                        viatura={viatura}
                                                        removeViatura={async () =>
                                                            await removeViatura(viatura.id_viatura)
                                                        }
                                                        editViatura={editViatura}
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                
                            </Card>
                        </Row>
                        
                        <Modal size="lg" show={isCreated} onHide={() => setIsCreated(false)}>
                            <Modal.Header>
                                <Modal.Title>Cadastrar nova viatura</Modal.Title>
                            </Modal.Header>
                            <Form
                                noValidate
                                onSubmit={handleSubmit(addViatura)}
                                validated={!!errors}
                            >
                                <Modal.Body>
                                    <Row className="d-flex align-items-start mb-4">
                                        <Col sm={6}>
                                            <Form.Group >
                                                <Form.Label>
                                                    Seleciona uma marca:
                                                </Form.Label>
                                                <Form.Select {...register("marca")}  size="lg"  >
                                                    <option disabled>Clique para selecionar a marca</option>
                                                    <option value={"Chevrolet"}>Chevrolet</option>
                                                    <option value={"Fiat"}>Fiat</option>
                                                    <option value={"Volkswagen"}>Volkswagen</option>
                                                    <option value={"Hyundai"}>Hyundai</option>
                                                    <option value={"Toyota"}>Toyota</option>
                                                    <option value={"Renault"}>Renault</option>
                                                    <option value={"Honda"}>Honda</option>
                                                    <option value={"Nissan  "}>Nissan</option>
                                                </Form.Select>
                                             </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group>
                                                <Form.Label>
                                                    Seleciona uma cor:
                                                </Form.Label>
                                                <Form.Select {...register("cor")}  size="lg">
                                                    <option disabled>Clique para selecionar uma cor</option>
                                                    <option value={"Preto"}>Preto</option>
                                                    <option value={"Branco"}>Branco</option>
                                                    <option value={"Azul"}>Azul</option>
                                                    <option value={"Vermelho"}>Vermelho</option>
                                                    <option value={"Cinza"}>Cinza</option>
                                                    <option value={"Prata"}>Prata</option>
                                                </Form.Select>
                                            </Form.Group>
                                            
                                        </Col>
                                    </Row>

                                    <Row className="d-flex align-items-start mb-4">
                                        <Col sm={6}> <Input
                                            size={'sm'} 
                                            type="text"
                                            label="Modelo:*"
                                            placeholder="Informe o modelo do carro:"
                                            required={true}
                                            name="modelo"
                                            error={errors.modelo}
                                            validations={register("modelo", {
                                                required: {
                                                    value: true,
                                                    message: "O modelo é um campo obrigatória",
                                                },
                                            })}
                                            />  
                                        </Col>
                                        <Col sm={6}>
                                            <Input
                                            type="text"
                                            label="Chassi:*"
                                            placeholder="Informe o chassi do carro:"
                                            required={true}
                                            name="chassi"
                                            error={errors.chassi}
                                            validations={register("chassi", {
                                                required: {
                                                    value: true,
                                                    message: "O chassi é um campo obrigatória",
                                                },
                                            })}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="d-flex align-items-start mb-3">
                                        <Col sm={6}>
                                            <Input
                                            type="number"
                                            label="Portas:*"
                                            placeholder="Informe a quantidade de portas do carro:"
                                            required={true}
                                            name="portas"
                                            error={errors.portas}
                                            validations={register("portas", {
                                                required: {
                                                    value: true,
                                                    message: "A quantidade de portas é um campo obrigatória",
                                                },
                                            })}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Input
                                            type="number"
                                            label="Bancos:*"
                                            placeholder="Informe a quantidade de bancos do carro:"
                                            required={true}
                                            name="bancos"
                                            error={errors.bancos}
                                            validations={register("bancos", {
                                                required: {
                                                    value: true,
                                                    message: "A quantidade de bancos é um campo obrigatório",
                                                },
                                            })}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="d-flex align-items-start mb-3">
                                        <Col sm={6}>
                                            <Input
                                            type="number"
                                            label="Kilometragem:*"
                                            placeholder="Informe a quantidade de km rodados do carro:"
                                            required={true}
                                            name="kilometragem"
                                            error={errors.kilometragem}
                                            validations={register("kilometragem", {
                                                required: {
                                                    value: true,
                                                    message: "A kilometragem é um campo obrigatório",
                                                },
                                            })}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Input
                                            type="text"
                                            label="Piloto:*"
                                            placeholder="Informe o nome do piloto:"
                                            required={true}
                                            name="piloto"
                                            error={errors.piloto}
                                            validations={register("piloto", {
                                                required: {
                                                    value: true,
                                                    message: "A kilometragem é um campo obrigatório",
                                                },
                                            })}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="d-flex align-items-start mb-3">
                                        <Col sm={6}>
                                            <Form.Group >
                                                <Form.Label>
                                                    Selecione um órgão:
                                                </Form.Label>
                                                <Form.Select {...register("orgao_vinculado")}  size="lg">
                                                    <option disabled>Clique para selecionar um órgão</option>
                                                    <option value={"PF"}>Polícia Federal</option>
                                                    <option value={"PM"}>Polícia Militar</option>
                                                    <option value={"PC"}>Polícia Cívil</option>
                                                    <option value={"Ex"}>Exército</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>    
                                        <Col sm={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Selecione um batalhão:
                                                </Form.Label>
                                                <Form.Select {...register("batalhao")}  size="lg">
                                                    <option disabled>Clique para selecionar um órgão</option>
                                                    <option value={"10b"}>10º batalhão</option>
                                                    <option value={"11b"}>11º batalhão</option>
                                                    <option value={"12b"}>12º batalhão</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>    
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
