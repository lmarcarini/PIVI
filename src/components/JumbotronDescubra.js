import React, { useState } from 'react'
import {db} from '../firebase'
import { Button, Container, Jumbotron } from 'react-bootstrap'


export default function JumbotronDescubra() {

    const [entidade,setEntidade]=useState({
        nome: ""
    })

    db.collection("entidades").limit(1).get().then((querySnapshot) => {
        console.log("teste")
        var doc=querySnapshot[querySnapshot.size * Math.random() | 0]
        setEntidade({nome: doc?.get("nome")||"Erro"})
    })

    function curtir (e){
        e.preventDefault()
        db.collection("usuarios/id/curtida").doc("idEntidade").set({
            curtida: true
        })
    }

    return (
        <Jumbotron fluid>
        <Container>
            <h1>{entidade.nome}</h1>
            <p>
            Espaço reservado para descrição básica da entidade.
            </p>
            <Button onClick={curtir}>Curtir</Button>
        </Container>
        </Jumbotron>
    )
}
