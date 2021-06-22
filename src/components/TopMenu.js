import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
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
                        {currentUser && 
                            <>
                            <LinkContainer to="/cadastrarentidade">
                                <Nav.Link>Criar entidade</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/minhasentidades">
                                <Nav.Link>Gerenciar entidades</Nav.Link>
                            </LinkContainer>
                            </>
                        }
                    </Nav>
                        {currentUser ? 
                                <Nav className="ml-auto">
                                    <LinkContainer to="/editarconta">
                                        <Nav.Link>Editar conta</Nav.Link>
                                    </LinkContainer>
                                    <Nav.Link onClick={onLogout}>Sair da Conta</Nav.Link>
                                </Nav>
                            :
                            <Nav className="ml-auto">
                                <LinkContainer to="/login">
                                    <Nav.Link>Conectar</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/signup">
                                    <Nav.Link>Criar Conta</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        }
                </NavbarCollapse>
            </Navbar>
        </>
    )
}
