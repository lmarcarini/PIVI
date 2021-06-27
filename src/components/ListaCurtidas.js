import React, { useCallback, useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { LinkContainer } from 'react-router-bootstrap'
import { db } from '../firebase'
import { Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

function ListaCurtidas() {
    const [entidades,setEntidades]=useState([])
    const {currentUser} = useAuth()

    const getNovaEntidade=useCallback(async ()=>{
        const querySnapshot=await db.collectionGroup("curtidas")
        .where("curtiu", "==", currentUser.uid)
        .get()
        let ent=[]
        let promises=querySnapshot.docs.map(doc=>{
            return doc.ref.parent.parent.get().then(pdoc=>{
                let temp=pdoc.data()
                temp.id=pdoc.id
                ent.push(temp)
             })
        })
        Promise.all(promises).then(doc=>{
            setEntidades(ent)})
    },[currentUser.uid])

    useEffect(()=> getNovaEntidade()
        ,[getNovaEntidade])


    return (
        <div>
            <ListGroup>
                {entidades.length===0 && "Nenhuma instituição favoritada ainda!"}   
                {entidades.map(entidade=>
                <Navbar key={entidade.id}>
                    <Nav className="mr-auto" >
                        <LinkContainer to={"/perfil?id="+entidade.id}>
                            <Nav.Link>{entidade.nomeExibicao}</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                )}
            </ListGroup>
            
        </div>
    )
}

export default ListaCurtidas
