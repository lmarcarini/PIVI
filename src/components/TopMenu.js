import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { useHistory } from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {useAuth} from '../context/AuthContext'

export default function TopMenu() {
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const history = useHistory()

    async function onLogout(e){
        e.preventDefault()

        try{
            await logout()
            history.push("/")
        }catch{
            console.log("Algo deu errado")
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand>Apoia</Navbar.Brand>
                </LinkContainer>
                <NavbarToggle aria-controls="responsive-navbar-nav"/>
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ml-auto">
                        {currentUser && 
                            <NavDropdown title="Minhas entidades" id="basic-nav-dropdown" alignRight>
                                <LinkContainer to="/minhasentidades">
                                    <NavDropdown.Item>Gerenciar</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/cadastrarentidade">
                                    <NavDropdown.Item>Cadastrar</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                        {currentUser ? 
                                <NavDropdown title="Conta" id="collapsable-nav-dropdown" alignRight >
                                    <LinkContainer to="/editarconta">
                                        <NavDropdown.Item>Editar </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={onLogout}>Sair da Conta</NavDropdown.Item>
                                </NavDropdown>
                            :
                            <NavDropdown title="Conta" id="collapsable-nav-dropdown" alignRight >
                                <LinkContainer to="/login">
                                    <Nav.Link>Conectar</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/signup">
                                    <Nav.Link>Criar Conta</Nav.Link>
                                </LinkContainer>
                            </NavDropdown>
                        }
                    </Nav>
                </NavbarCollapse>
            </Navbar>
        </>
    )
}
