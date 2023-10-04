import { Modal as ModalComponent, Button } from 'react-bootstrap';

export function RemoveItem(props) {

    function remover() {
        props.remove()
        props.setModalDelete(false)
    }
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
                <Button variant="success" onClick={() => remover()}>
                    Excluir
                </Button>
            </ModalComponent.Footer>
        </ModalComponent>
    );
}
