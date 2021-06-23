import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { LinkContainer } from 'react-router-bootstrap'
import { db } from '../firebase'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/AuthContext'

function ListaEntidades() {
    const [entidades,setEntidades]=useState([])
    const {currentUser} = useAuth()

    const getNovaEntidade=()=>{
        db.collection("entidades")
        .where("user", "==", currentUser.id)
        .get().then((querySnapshot) => {
            var entidades=[]
            querySnapshot.forEach(doc=>{
                let temp=doc.data()
                temp.id=doc.id
                entidades.push(temp)
            })
            setEntidades(entidades)
         })
    }

    useEffect(()=>
        getNovaEntidade()
        ,[])

    async function onDelete(e){
        e.preventDefault()
        if(!window.confirm("Confirma a exclusão dessa entidade?")) return false
        db.collection("entidades").doc(e.currentTarget.value).delete().then(() => {
            console.log("Document successfully deleted!");
            window.location.reload();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <div>
            <ListGroup>
                
                {entidades.map(entidade=>
                <Navbar key={entidade.id}>
                    <Nav className="mr-auto" >
                        <LinkContainer to={"/perfil?id="+entidade.id}>
                            <Nav.Link>{entidade.nomeExibicao}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/editarentidade?id="+entidade.id}>
                            <Nav.Link><FontAwesomeIcon icon={faEdit} size="lg"/></Nav.Link>
                        </LinkContainer>
                        <Button onClick={onDelete} variant="danger" value={entidade.id}><FontAwesomeIcon icon={faTrash} size="lg"/></Button>
                    </Nav>
                </Navbar>
                
                )}
                
            </ListGroup>
            
        </div>
    )
}

export default ListaEntidades
