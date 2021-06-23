import React from 'react';
import {db, storage} from '../firebase';
import {Button, Form, FormGroup} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'


function CadastroEntidades() {
  const {currentUser}=useAuth();
  const [loading,setLoading]=useState(false)
  const history=useHistory();

  async function handleSubmit (e){
    e.preventDefault()
    setLoading(true)
    let form=e.target
    let entidade={
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
      },
      user: currentUser.uid
    }
    try{
      let {id} = await db.collection("entidades").add(entidade)
      if(form.foto.files[0]){
        let urlPath="imgEntidades/"+id+form.foto.files[0].name.match(/\..*$/)
        const uploadTest=await storage.ref()
          .child(urlPath)
          .put(form.foto.files[0])
        const downloadUrl=await uploadTest.ref.getDownloadURL()
        await db.collection("entidades").doc(id).update({downloadUrl: downloadUrl, urlPath: urlPath})
      }
      history.push("/perfil?id="+id)
    }catch(error){
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <Form className="defaut" onSubmit={handleSubmit}>
      <h2 className="text-center">Cadastrar Entidade</h2>
        <FormGroup>
          <Form.Label className="mt-3"><b>Nome da entidade*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome da entidade" name="nome" required/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>Nome da entidade a ser exibido na plataforma*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome de preferência" name="nomeExibicao" required/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>CNPJ*</b></Form.Label>
          <Form.Control type="text" placeholder="CNPJ" name="cnpj" required/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>Nome do(a) presidente*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome do(a) presidente" name="presidente" required/>
        </FormGroup>

        <FormGroup className="mt-3">
          <Form.Label><b>Tipo de público atendido</b></Form.Label>
          <Form.Check type="checkbox" id="criancas" name="criancas" label="Crianças"/>
          <Form.Check type="checkbox" id="adolescentes" name="adolescentes" label="Adolescentes"/>
          <Form.Check type="checkbox" id="adultos" name="adultos" label="Adultos"/>
          <Form.Check type="checkbox" id="idosos" name="idosos" label="Idosos"/>
          <Form.Check type="checkbox" id="pcd" name="pcd" label="Pessoas com deficiências"/>
        </FormGroup>

        <FormGroup className="mt-3" required>
          <Form.Label><b>Tipo de período em que atende</b></Form.Label>
          <Form.Check type="radio" id="periodounico" name="periodo" label="Um período" value="unico"/>
          <Form.Check type="radio" id="periodointegral" name="periodo" label="Período integral" value="integral"/>
        </FormGroup>

        <FormGroup className="mt-3">
          <Form.Label><b>Descrição da entidade</b></Form.Label>
          <Form.Control as="textarea" placeholder="Descreva aqui o que sua entidade faz e é." name="descricao" label="Descrição"/>
        </FormGroup>

        <FormGroup className="mt-3">
          <Form.Label><b>Como podem contribuir para sua entidade?</b></Form.Label>
          <Form.Control as="textarea" placeholder="Descreva aqui como podem ajudar a sua entidade." name="contribuicao" label="Contribuição"/>
        </FormGroup>
        
        <Form.Label className="mt-3"><h4>Endereço</h4></Form.Label>
        
        <FormGroup>
        <Form.Label><b>Rua*</b></Form.Label>
        <Form.Control type="text" placeholder="Rua" name="rua" required/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Número*</b></Form.Label>
        <Form.Control type="text" placeholder="Número" name="numero" required/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Bairro*</b></Form.Label>
        <Form.Control type="text" placeholder="Bairro" name="bairro" required/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>CEP*</b></Form.Label>
        <Form.Control type="text" placeholder="CEP" name="cep" required/>
        </FormGroup>

        <Form.Label className="mt-3"><h4>Contato</h4></Form.Label>
        
        <FormGroup>
        <Form.Label><b>Telefone*</b></Form.Label>
        <Form.Control type="tel" placeholder="Telefone" name="telefone" required/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>E-mail para contato*</b></Form.Label>
        <Form.Control type="email" placeholder="E-mail para contato" name="email" required/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link do site da entidade (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="site"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link da página ou pefil no Facebook (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="facebook"/>
        </FormGroup>
        
        <FormGroup>
        <Form.Label><b>Link da página ou pefil no Instagram (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="instagram"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link do canal do Youtube (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link" name="youtube"/>
        </FormGroup>

        <FormGroup className="mt-3">
        <Form.Label className="mt-3"><b>Imagem ilustrativa da entidade (resolução recomendada: 1080px x 720px)</b></Form.Label>
        <Form.Control type="file" id="foto-ilustrativa" name="foto"/>
        </FormGroup>
        
        <div className="mt-3">
        <Button disabled={loading} className="btn btn-primary btn-lg mt-3" type="submit">Finalizar cadastro</Button><br></br>
        <Form.Control className="btn btn-primary btn-lg mt-3" type="reset" value="Limpar campos"></Form.Control>
        </div>
       </Form>
  );
}

export default CadastroEntidades;
