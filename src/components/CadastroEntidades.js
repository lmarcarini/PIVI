
import React from 'react'
import {Button, Form, FormGroup} from 'react-bootstrap';


function CadastroEntidades() {
  return (
    <Form className="defaut">
      <h1 className="text-center">PIVI</h1>
      <h2 className="text-center">Cadastrar Entidade</h2>
      <h3 className="text-center"><a href="Editar-cadastro-entidade.js">Editar cadastro existente</a></h3>

      <i className="text-center">Itens com "*" são de preenchimento obrigatório</i>

        <FormGroup>
          <Form.Label class="mt-3"><b>Nome da entidade*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome da entidade"/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>Nome da entidade a ser exibido na plataforma*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome de preferência"/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>CNPJ*</b></Form.Label>
          <Form.Control type="text" placeholder="CNPJ"/>
        </FormGroup>

        <FormGroup>
          <Form.Label><b>Nome do(a) presidente*</b></Form.Label>
          <Form.Control type="text" placeholder="Nome do(a) presidente"/>
        </FormGroup>

        <FormGroup class="mt-3">
          <Form.Label><b>Tipo de público atendido*</b></Form.Label>
          <Form.Check type="checkbox" id="criancas" name="criancas" label="Crianças"/>
          <Form.Check type="checkbox" id="adolescentes" name="adolescentes" label="Adolescentes"/>
          <Form.Check type="checkbox" id="adultos" name="adultos" label="Adultos"/>
          <Form.Check type="checkbox" id="idosos" name="idosos" label="Idosos"/>
          <Form.Check type="checkbox" id="pcd" name="pcd" label="Pessoas com deficiências"/>
        </FormGroup>

        <FormGroup class="mt-3">
          <Form.Label><b>Tipo de período em que atende*</b></Form.Label>
          <Form.Check type="radio" id="periodounico" name="periodo" label="Um período"/>
          <Form.Check type="radio" id="periodointegral" name="periodo" label="Período integral"/>
        </FormGroup>
        
        <Form.Label class="mt-3"><h4>Endereço</h4></Form.Label>
        
        <FormGroup>
        <Form.Label><b>Rua*</b></Form.Label>
        <Form.Control type="text" placeholder="Rua"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Número*</b></Form.Label>
        <Form.Control type="text" placeholder="Número"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Bairro*</b></Form.Label>
        <Form.Control type="text" placeholder="Bairro"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>CEP*</b></Form.Label>
        <Form.Control type="text" placeholder="CEP"/>
        </FormGroup>

        <Form.Label class="mt-3"><h4>Contato</h4></Form.Label>
        
        <FormGroup>
        <Form.Label><b>Telefone*</b></Form.Label>
        <Form.Control type="tel" placeholder="Telefone"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>E-mail para contato*</b></Form.Label>
        <Form.Control type="email" placeholder="E-mail para contato"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link do site da entidade (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link da página ou pefil no Facebook (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link"/>
        </FormGroup>
        
        <FormGroup>
        <Form.Label><b>Link da página ou pefil no Instagram (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link"/>
        </FormGroup>

        <FormGroup>
        <Form.Label><b>Link do canal do Youtube (se tiver)</b></Form.Label>
        <Form.Control type="url" placeholder="Insira o link"/>
        </FormGroup>

        <FormGroup>
        <Form.Label class="mt-3"><b>Foto para perfil (resolução recomendada 480px x 480px)</b></Form.Label>
        <Form.Control type="file" id="foto-perfil"/>
        </FormGroup>

        <FormGroup class="mt-3">
        <Form.Label class="mt-3"><b>Foto ilustrativa da entidade (resolução recomendada: 1080px x 720px)</b></Form.Label>
        <Form.Control type="file" id="foto-ilustrativa"/>
        </FormGroup>
        
        <div class="mt-3">
        <Button class="btn btn-primary btn-lg mt-3" type="submit">Finalizar cadastro</Button><br></br>
        <Form.Control class="btn btn-primary btn-lg mt-3" type="reset" value="Limpar campos"></Form.Control>
        </div>
       </Form>
  );
}

export default CadastroEntidades;
