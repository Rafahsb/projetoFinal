

import Nav from 'react-bootstrap/Nav';

export function Navigation() {
    return (
       
       
        <Nav defaultActiveKey="/painel" className="flex-column  border-end vh-100">
            <Nav.Link href="/painel" className='mt-4'>Painel</Nav.Link>
            <Nav.Link href="/viaturas" eventKey="link-1">Viaturas</Nav.Link>
            <Nav.Link href="/manutencoes" eventKey="link-2">Manutenções</Nav.Link>
            <Nav.Link href="/usuarios" eventKey="">Usuários</Nav.Link>
        </Nav>
        
    );
}
