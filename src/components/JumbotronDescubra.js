import React, { useCallback, useEffect, useState } from 'react'
import {db} from '../firebase'
import { Container, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CurtirBotao from './CurtirBotao'


export default function JumbotronDescubra() {
    const [entidades,setEntidades]=useState([])
    const [current,setCurrent]=useState(0)


    const getNovaEntidade=useCallback(async ()=>{
        const querySnapshot=await db.collection("entidades").get()
        let entidades=querySnapshot.docs.map(doc=>{
            let entidade=doc.data()
            entidade.id=doc.id
            return entidade
        })
        setCurrent(Math.floor(Math.random() * entidades.length | 0))
        setEntidades(entidades)
    },[])

    useEffect(()=>
        getNovaEntidade()
        ,[getNovaEntidade])

    const imgStyle={
        backgroundImage: `url(${entidades[current]?.downloadUrl})`,
        height:"256px",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundSize:"100%"}

    return (
        <>
   
        {entidades[current]?.downloadUrl && 
            <Jumbotron fluid style={imgStyle}/>
        }
        <Container className="mt-3">
            <h6>Você conhece essa instituição? <CurtirBotao entidadeId={entidades[current]?.id || 0} /></h6>
            <h1>{entidades[current]?.nomeExibicao || ""}</h1>
            <p>
            {entidades[current]?.descricao || ""}
            </p>
            <Link to={'/perfil?id='+entidades[current]?.id}>Mais informações aqui</Link>
        </Container>

        
        </>
    )
}
