import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { Button, Container, Jumbotron } from 'react-bootstrap'


export default function JumbotronDescubra() {

    const [entidade,setEntidade]=useState({
        nome: ""
    })

    const getNovaEntidade=()=>{
        db.collection("entidades").limit(10).get().then((querySnapshot) => {
            var entidades=[]
            querySnapshot.forEach(doc=>{
                entidades.push({
                    nome: doc.get("nome")
                })
            })
            if(entidades.length===0){
                console.log("Nenhum carregado")
            }else{
                setEntidade(entidades[Math.floor(Math.random() * entidades.length)]||"Erro ao carregar")
            }
         })
    }

    useEffect(()=>
        getNovaEntidade()
        ,[])

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
