import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export function Nav() {
    return (
        <Container fluid className="">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="/img/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{" "}
                React Bootstrap
            </Navbar.Brand>
        </Container>
    );
}
