import { Modal as ModalComponent, Button } from 'react-bootstrap';

export function RemoveItem(props) {
    return (
        <ModalComponent show={props.show} onHide={props.handleClose}>
            <ModalComponent.Header closeButton>
                <ModalComponent.Title>
                    {props.title}
                </ModalComponent.Title>
            </ModalComponent.Header>
            <ModalComponent.Body>
                {props.message}
            </ModalComponent.Body>
            <ModalComponent.Footer>
                <Button variant="danger" onClick={props.handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={props.remove}>
                    Excluir
                </Button>
            </ModalComponent.Footer>
        </ModalComponent>
    );
}
