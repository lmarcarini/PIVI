import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import { db } from '../firebase'

function ListaEntidades() {
    const [entidades,setEntidades]=useState([])

    const getNovaEntidade=()=>{
        db.collection("entidades")
        .where("user", "==", "R9iwISorcpZNHA91YEw5Gfy5G1m1")
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

    return (
        <div>
            <ListGroup>
                {entidades.map(entidade=>
                    <ListGroup.Item>
                        <Link to="/">{entidade.nomeExibicao}</Link>
                        <Link to={"/editarentidade?id="+entidade.id}>Editar</Link>
                    </ListGroup.Item>
                )}
            </ListGroup>
            
        </div>
    )
}

export default ListaEntidades
