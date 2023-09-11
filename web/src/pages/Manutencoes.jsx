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
    deleteManutencao,
    getBuscarManutencoes
} from "../services/manutencoes-service";
import { Manutencao } from "../components/Manutencao";
import { BsCheckLg } from "react-icons/bs";
import Pagination from 'react-bootstrap/Pagination';

import {
    getViaturas,
} from "../services/viaturas-service";

export function Manutencoes() {
    var manutencoes;
    const [manutencoesAtt, setManutencoesAtt] = useState([]);

    const [viaturas, setViaturas] = useState([]);
    const [inputValue, setInputValue] = useState("");

    let currentPage = 0;
    const [currentPages, setCurrentPages] = useState(0);

    const [totalPages, setTotalPages] = useState(0);
    const [active, setActive] = useState(0);
    const [manutencoesList, setManutencoesList] = useState([]);

    const itemsPerPage = 3;
    const [maxPagesLimit, setMaxPagesLimit] = useState(5);
    const [minPagesLimit, setMinPagesLimit] = useState(0);




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


    async function filterManutencoes(params) {
        try {
            const result = await getBuscarManutencoes(params)
            manutencoes = result.data.Manutencoes 
            setManutencoesAtt(manutencoes);
            setTotalPages(Math.ceil(manutencoes.length / itemsPerPage));
            paginate(manutencoes)
        } catch (error) {
            navigate("/manutencoes");
            console.error(error);
        }
    }

    async function findViaturas() {
        try {
            const result = await getViaturas()
            setViaturas(result.data.Viaturas)
                 
        } catch (error) {
            console.error(error);
            navigate("/manutencoes");
        }
    }

    async function findManutencoes() {
        try {
            const result = await getManutencoes()
            manutencoes = result.data.Manutencoes
            setManutencoesAtt(manutencoes);
            setTotalPages(Math.ceil(manutencoes.length / itemsPerPage));
            paginate(manutencoes)
        
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
                data: data.data_nota,
                id_viatura: data.id_viatura,
            });
            await findManutencoes();
        } catch (error) {
            console.error(error);
        }
    }

    

    function paginate(inicial) {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        console.log("inicial", inicial);
        const subset = inicial.slice(startIndex, endIndex);
        setManutencoesList(subset);
        
        // if(manutencoes.length === 0) {
        //     const subset = inicial.slice(startIndex, endIndex);
        //     setManutencoesList(subset);
        // } else { 
        //     const subset = manutencoes.slice(startIndex, endIndex);
        //     setManutencoesList(subset);
        // }

    }

    function PaginationFront() {
        
        let items = [];
        
        if(totalPages > 5) {

            for (let numeroPagina = minPagesLimit; numeroPagina <= maxPagesLimit - 1; numeroPagina++) {
                items.push(
                <Pagination.Item key={numeroPagina} active={numeroPagina === active} onClick={() => {
                    currentPage = numeroPagina;
                    setCurrentPages(numeroPagina)
                    setActive(numeroPagina);
                    paginate(manutencoesAtt);
                    setMaxPagesLimit(numeroPagina > totalPages - 3 ? totalPages : numeroPagina < 3 ? 5 : currentPage + 3);
                    setMinPagesLimit((numeroPagina > 3  && numeroPagina <  totalPages - 3) ? currentPage - 2 : numeroPagina < 3 ? 0 : numeroPagina > totalPages - 3 ? totalPages - 5 : currentPage - 2)
                }}>
                    {numeroPagina + 1 }
                </Pagination.Item>,
                );
            }
        } else {
            for (let numeroPagina = minPagesLimit; numeroPagina <= totalPages - 1; numeroPagina++) {
                items.push(
                <Pagination.Item key={numeroPagina} active={numeroPagina === active} onClick={() => {
                    currentPage = numeroPagina;
                    setCurrentPages(numeroPagina)
                    setActive(numeroPagina);
                    paginate(manutencoesAtt);
                    setMaxPagesLimit(numeroPagina > totalPages - 3 ? totalPages : numeroPagina < 3 ? 5 : currentPage + 3);
                    setMinPagesLimit((numeroPagina > 3  && numeroPagina <  totalPages - 3) ? currentPage - 2 : numeroPagina < 3 ? 0 : numeroPagina > totalPages - 3 ? totalPages - 5 : currentPage - 2)
                }}>
                    {numeroPagina + 1 }
                </Pagination.Item>,
                );
            }
        }
        
        return (
            <Pagination className='d-flex justify-content-center'>
                <Pagination.First onClick={() => {
                currentPage = 0;
                setActive(0);
                paginate(manutencoesAtt);
                setMaxPagesLimit(5);
                setMinPagesLimit(0);
            }} />
               
                {items}
               
                <Pagination.Last onClick={() => {
                currentPage = totalPages - 1 ;
                setActive(totalPages - 1);
                paginate(manutencoesAtt);
                setMaxPagesLimit(totalPages);
                setMinPagesLimit(totalPages - 5);
            }}/>
            </Pagination>
        );
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
                                <p className="h3 mt-4">Manutenções</p>
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
                                    <Button onClick={() => filterManutencoes(inputValue)} variant="primary" id="button-addon2">
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
                                            
                                            {manutencoesList.map((manutencao, index) => (
                                                <tr key={index}>
                                                    <Manutencao
                                                        manutencao={manutencao}
                                                        removeManutencao={async () =>
                                                            await removeManutencao(manutencao.id_manutencao)
                                                        }
                                                        editManutencao={editManutencao}
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <PaginationFront></PaginationFront>
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
