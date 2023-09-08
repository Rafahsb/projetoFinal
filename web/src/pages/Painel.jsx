import { Head } from "../components/Head";
import { Navigation } from "../components/Navigation";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export function Painel() {
    return (
        <>

                <Head></Head>
                <Row className="vh-100">
                    <Col sm={3}>
                        <Navigation></Navigation>
                    </Col>
                    <Col sm={9}>
                        <div>
                            a
                        </div>  
                    </Col>
                </Row>
        </>
    );
}
