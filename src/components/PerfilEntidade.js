import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import fbLogo from '../social/fb_64px.png'
import instagramLogo from '../social/insta_64px.png'
import youtubeLogo from '../social/youtube_64px.png'
import emailLogo from '../social/email_64px.png'
import { Row } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { db } from '../firebase'

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export default function PerfilEntidade() {
    let query = useQuery()
    const id=query.get("id")
    const [entidade,setEntidade]=useState({})

    useEffect(()=>{
        if(id) {
          db.collection("entidades").doc(id).get().then(doc=>{
          if(doc.exists) {
            setEntidade(doc.data())
          }
        })}
      },[id])

    return (
        <>
        {entidade.downloadUrl &&
        <div style={    {justifyContent: "center",
            height: "45vw", /* or other desired height */
            maxWidth: "1080px",
            maxHeight: "486px",
            overflow: "hidden",
            backgroundImage:`url(${entidade.downloadUrl})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginBottom:"10px"}}>
        </div>
        }
        <h1>{entidade.nomeExibicao || "Carregando"}</h1>
        <p>{entidade.descricao || ""}</p>
        {entidade.contribuicao && <>
            <h4>
            Como posso contribuir?
            </h4>
            <p>
                {entidade.contribuicao}
            </p>
        </>}
        <h4>Contato</h4>
        <h6>Telefone: <small>{entidade.contato?.telefone && entidade.contato.telefone}</small></h6>
        {entidade.contato?.site &&
            <h6>Site: <a href={ entidade.contato.site }>{entidade.contato.site}</a></h6>
        }
        <Row className="px-3">
            {entidade.contato?.email && 
            <a href={"mailto:"+entidade.contato.email}>
                <Image className="px-2" src={emailLogo} rounded alt="Email"/>
            </a>  } 
            {entidade.contato?.facebook && 
            <a href={entidade.contato?.facebook}>
                <Image className="px-2" src={fbLogo} rounded alt="Facebook"/>
            </a>   
            }
            {entidade.contato?.youtube && 
                <a href={entidade.contato?.youtube}>
                <Image className="px-2" src={youtubeLogo} rounded alt="Youtube"/>
            </a>   
            }
            {entidade.contato?.instagram && 
                <a href={entidade.contato?.instagram}>
                    <Image className="px-2" src={instagramLogo} rounded alt="Instagram"/>
                </a>   
            }
        </Row>
        <h4>Endereço</h4>
        <p>{entidade.endereco?.rua || "carregando"}, {entidade.endereco?.numero || "carregando"}. Bairro  {entidade.endereco?.bairro || "carregando"}, Tupã, SP.</p>
        </>
        
    )
}
