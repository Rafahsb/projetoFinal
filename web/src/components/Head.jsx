import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import HomeOutlinedIcon from "@mui/icons-material/Menu";

export function Head() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand className="d-flex align-items-center">
                    <HomeOutlinedIcon className="text-primary"></HomeOutlinedIcon>
                    <h3 className="d-flex">
                        Via <div className="text-primary">Gestão</div>
                    </h3>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
