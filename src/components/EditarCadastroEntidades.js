import React, { useEffect } from 'react';
import {db, storage} from '../firebase';
import {Button, Form, FormGroup} from 'react-bootstrap';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function EditarCadastroEntidades() {
  let query = useQuery();
  const [id,setId]=useState("")
  const [idExists,setIdExists]=useState(false)
  const [loading,setLoading]=useState(false)
  const [entidade,setEntidade]=useState({
    nome: "",
    nomeExibicao: "",
    cnpj: "",
    presidente: "",
    descricao: "",
    contribuicao: "",
    publico:{
      criancas: "",
      adolescentes: "",
      adultos: "",
      idosos: "",
      pcd: ""
    },
    periodo: "",
    endereco:{
      rua: "",
      bairro: "",
      cep: "",
      numero: ""
    },
    contato:{
      telefone:"",
      email:"",
      facebook:"",
      instagram:"",
      youtube:"",
    }
  })

  useEffect(()=>{
    let id=query.get("id")
    
    if(id) {
      setId(id)
      db.collection("entidades").doc(id).get().then(doc=>{
      if(doc.exists) {
        setIdExists(true)
        setEntidade(doc.data())
      }
    })}
  },[query])

  async function handleSubmit (e){
    e.preventDefault()
    setLoading(true)
    let form=e.target
    let entidadeEnvio={
      nome: form.nome.value,
      nomeExibicao: form.nomeExibicao.value,
      cnpj: form.cnpj.value,
      presidente: form.presidente.value,
      descricao: form.descricao.value,
      contribuicao: form.contribuicao.value,
      publico:{
        criancas: form.criancas.checked,
        adolescentes: form.adolescentes.checked,
        adultos: form.adultos.checked,
        idosos: form.idosos.checked,
        pcd: form.pcd.checked
      },
      periodo: form.periodo.value,
      endereco:{
        rua: form.rua.value,
        bairro: form.bairro.value,
        cep: form.cep.value,
        numero: form.numero.value
      },
      contato:{
        telefone:form.telefone.value,
        site:form.site.value,
        email:form.email.value,
        facebook:form.facebook.value,
        instagram:form.instagram.value,
        youtube:form.youtube.value,
      }
    }
    try{
      db.collection("entidades").doc(id).update(entidadeEnvio).then(
        alert("Alterações feitas com sucesso!")
      )
      if(form.foto.files[0]){
        await storage.ref().child(entidade.urlPath).delete()
        let urlPath="imgEntidades/"+id+form.foto.files[0].name.match(/\..*$/)
        entidadeEnvio.urlPath=urlPath
        setEntidade(entidadeEnvio)
        const uploadTest=await storage.ref()
          .child(urlPath)
          .put(form.foto.files[0])
        const downloadUrl=await uploadTest.ref.getDownloadURL()
        await db.collection("entidades").doc(id).update({downloadUrl: downloadUrl, urlPath: urlPath})
      }
    }catch(error){
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <>
    {idExists && <Form className="defaut" onSubmit={handleSubmit}>
      <h2 className="text-center">Cadastrar Entidade</h2>
        <FormGroup>
          <Form.Label className="mt-3"><b>Nome da entidade*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome da entidade" name="nome" defaultValue={entidade.nome|| ""} required/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>Nome da entidade a ser exibido na plataforma*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome de preferência" name="nomeExibicao" defaultValue={entidade.nomeExibicao || ""} required/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>CNPJ*</b></Form.Label>
          <Form.Control type="text" placeholder="CNPJ" name="cnpj" defaultValue={entidade.cnpj || ""} required/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>Nome do(a) presidente*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome do(a) presidente" name="presidente" defaultValue={entidade.presidente || ""} required/>
        </FormGroup>

        <FormGroup className="mt-3">
          <Form.Label><b>Tipo de público atendido</b></Form.Label>
          <Form.Check type="checkbox" id="criancas" name="criancas" label="Crianças" defaultValue={entidade.publico.criancas || ""}/>
          <Form.Check type="checkbox" id="adolescentes" name="adolescentes" label="Adolescentes" defaultValue={entidade.publico.adolescentes || ""}/>
          <Form.Check type="checkbox" id="adultos" name="adultos" label="Adultos" defaultValue={entidade.publico.adultos || ""}/>
          <Form.Check type="checkbox" id="idosos" name="idosos" label="Idosos" defaultValue={entidade.publico.idosos || ""}/>
          <Form.Check type="checkbox" id="pcd" name="pcd" label="Pessoas com deficiências" defaultValue={entidade.publico.pcd || ""}/>
        </FormGroup>

        <FormGroup className="mt-3" required>
          <Form.Label><b>Tipo de período em que atende</b></Form.Label>
          <Form.Check type="radio" id="periodounico" name="periodo" label="Um período" value="unico"/>
          <Form.Check type="radio" id="periodointegral" name="periodo" label="Período integral" value="integral"/>
        </FormGroup>

        <FormGroup className="mt-3">
          <Form.Label><b>Descrição da entidade</b></Form.Label>
          <Form.Control as="textarea" placeholder="Descreva aqui o que sua entidade faz e é." name="descricao" label="Descrição" defaultValue={entidade.descricao || ""}/>
        </FormGroup>

        <FormGroup className="mt-3">
          <Form.Label><b>Como podem contribuir para sua entidade?</b></Form.Label>
          <Form.Control as="textarea" placeholder="Descreva aqui como podem ajudar a sua entidade." name="contribuicao" label="Contribuição" defaultValue={entidade.contribuicao || ""}/>
        </FormGroup>
        
        <Form.Label className="mt-3"><h4>Endereço</h4></Form.Label>
        
        <FormGroup>
        <Form.Label><b>Rua*</b></Form.Label>
        <Form.Control type="text" placeholder="Rua" name="rua" required defaultValue={entidade.endereco.rua || ""}/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Número*</b></Form.Label>
        <Form.Control type="text" placeholder="Número" name="numero" required defaultValue={entidade.endereco.numero || ""}/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Bairro*</b></Form.Label>
        <Form.Control type="text" placeholder="Bairro" name="bairro" required defaultValue={entidade.endereco.bairro || ""}/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>CEP*</b></Form.Label>
        <Form.Control type="text" placeholder="CEP" name="cep" required defaultValue={entidade.endereco.cep || ""}/>
        </FormGroup>

        <Form.Label className="mt-3"><h4>Contato</h4></Form.Label>
        
        <FormGroup>
        <Form.Label><b>Telefone*</b></Form.Label>
        <Form.Control type="tel" placeholder="Telefone" name="telefone" required defaultValue={entidade.contato.telefone || ""}/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>E-mail para contato*</b></Form.Label>
        <Form.Control type="email" placeholder="E-mail para contato" name="email" required defaultValue={entidade.contato.email || ""}/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link do site da entidade (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="site" defaultValue={entidade.contato.site || ""}/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link da página ou pefil no Facebook (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="facebook" defaultValue={entidade.contato.facebook || ""}/>
        </FormGroup>
        
        <FormGroup>
        <Form.Label><b>Link da página ou pefil no Instagram (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="instagram" defaultValue={entidade.contato.instagram || ""}/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link do canal do Youtube (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="youtube" defaultValue={entidade.contato.youtube || ""}/>
        </FormGroup>

        <FormGroup className="mt-3">
        <Form.Label className="mt-3"><b>Imagem ilustrativa da entidade (resolução recomendada: 1080px x 720px)</b></Form.Label>
        <Form.Control type="file" id="foto-ilustrativa" name="foto"/>
        </FormGroup>
        
        <div className="mt-3">
        <Button disabled={loading} className="btn btn-primary btn-lg mt-3" type="submit">Finalizar cadastro</Button><br></br>
        <Form.Control className="btn btn-primary btn-lg mt-3" type="reset" value="Limpar campos"></Form.Control>
        </div>
       </Form>}</>
  );
}

export default EditarCadastroEntidades;
