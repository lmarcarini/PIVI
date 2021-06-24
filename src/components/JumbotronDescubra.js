import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { Container, Jumbotron } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function JumbotronDescubra() {
    const {currentUser} = useAuth()
    const [entidade,setEntidade]=useState({})

    const getNovaEntidade=()=>{
        db.collection("entidades").limit(10).get().then((querySnapshot) => {
            var entidades=[]
            querySnapshot.forEach(doc=>{
                var entidade=doc.data()
                entidade.id=doc.id
                entidades.push(entidade)
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
        db.collection("usuarios/"+currentUser.uid+"/curtida").doc(entidade.id).set({
            curtida: true
        })
    }

    return (
        <>
        <Jumbotron fluid 
        style={{
            backgroundImage: `url(${entidade.downloadUrl})`,
            height:"256px",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"100%"}}>
        </Jumbotron>
        <Container>
            <h6>Você conhece essa instituição? <FontAwesomeIcon icon={faHeart} size="lg" onClick={curtir}/></h6>
            <h1>{entidade.nome || ""}</h1>
            <p>
            {entidade.descricao || ""}
            </p>
            <Link to={'/perfil?id='+entidade.id}>Mais informações aqui</Link>
        </Container>
        </>
    )
}
