
import './App.css';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';


function App() {
  return (
    <Form className="defaut">
      <h1 className="text-center">PIVI</h1>
      <h2 className="text-center">Editar cadastro da entidade</h2>
      
        <FormGroup>
        <Label class="mt-3"><b>Aterar nome</b></Label>
        <Input type="text" placeholder={Nome}></Input>
        </FormGroup>

        <FormGroup>
        <Label><b>Alterar CNPJ</b></Label>
        <Input type="text" placeholder={Cnpj}/>
        </FormGroup>

        <FormGroup>
        <Label><b>Alterar nome do(a) presidente</b></Label>
        <Input type="text" placeholder={Presidente}/>
        </FormGroup>

        <FormGroup class="mt-3">
        <Label><b>Alterar tipo de público atendido</b></Label><br></br>
        <Input type="checkbox"id="crianças" name="tipo" value="crianças"/>
        <Label for="crianças">Crianças</Label><br></br>
        <Input type="checkbox"id="adolescentes" name="tipo" value="adolescentes"/>
        <Label for="adolescentes">Adolescentes</Label><br></br>
        <Input type="checkbox"id="Idoso" name="tipo" value="idosos"/>
        <Label for="idosos">Idosos</Label><br></br>
        <Input type="checkbox"id="PCD" name="tipo" value="PCD"/>
        <Label for="PCD">Pessoas com deficiências</Label><br></br>
        </FormGroup>

        <FormGroup class="mt-3">
        <Label><b>Alterar tipo de período em que atende</b></Label><br></br>
        <Input type="checkbox"id="Um-Periodo" name="tipo" value="Um-Periodo"/>
        <Label for="Um-Periodo">Um período</Label><br></br>
        <Input type="checkbox"id="Periodo-Integral" name="tipo" value="Periodo-Integral"/>
        <Label for="Periodo-Integral">Período integral</Label><br></br>
        </FormGroup>
        
        <h4 class="mt-3">Alterar endereço</h4>
        
        <FormGroup>
        <Label><b>Rua</b></Label>
        <Input type="text" placeholder={Rua}/>
        </FormGroup>

        <FormGroup>
        <Label><b>Número</b></Label>
        <Input type="text" placeholder={Numero}/>
        </FormGroup>

        <FormGroup>
        <Label><b>Bairro</b></Label>
        <Input type="text" placeholder={Bairro}/>
        </FormGroup>

        <FormGroup>
        <Label><b>CEP</b></Label>
        <Input type="text" placeholder={Cep}/>
        </FormGroup>

        <h4 class="mt-3">Contato</h4>
        
        <FormGroup>
        <Label><b>Telefone</b></Label>
        <Input type="tel" placeholder={Telefone}/>
        </FormGroup>

        <FormGroup>
        <Label><b>E-mail para contato</b></Label>
        <Input type="email" placeholder={Email}/>
        </FormGroup>

        <FormGroup>
        <Label><b>Link do site da entidade (se tiver)</b></Label>
        <Input type="url" placeholder={LinkSite}/>
        </FormGroup>

        <FormGroup>
        <Label><b>Link da página ou pefil no Facebook (se tiver)</b></Label>
        <Input type="url" placeholder={LinkFacebook}/>
        </FormGroup>
        
        <FormGroup>
        <Label><b>Link da página ou pefil no Instagram (se tiver)</b></Label>
        <Input type="url" placeholder={LinkInstagram}/>
        </FormGroup>

        <FormGroup>
        <Label><b>Link do canal do Youtube (se tiver)</b></Label>
        <Input type="url" placeholder={LinkYoutube}/>
        </FormGroup>

        <h4 class="mt-3">Cadastro</h4>

        <FormGroup>
        <Label><b>Nome da entidade a ser exibido na plataforma</b></Label>
        <Input type="text" placeholder={NomePerfil}/>
        </FormGroup>

        <FormGroup>
        <Label><b>E-mail para acessar a plataforma(Atual: {EmailLogin})</b></Label>
        <Input type="email" placeholder="E-mail para acesso"/>
        </FormGroup>

        <Label class="mt-3"><h4>Alterar senha</h4></Label>

        <FormGroup>
        <Label><b>Senha atual</b></Label>
        <Input type="password" placeholder="Senha atual"/>
        </FormGroup>

        <FormGroup>
        <Label><b>Nova senha</b></Label>
        <Input type="password" placeholder="Mínimo 8 dígitos"/>
        </FormGroup>

        <FormGroup>
        <Label><b>Repetir senha</b></Label>
        <Input type="password" placeholder="Confirme a senha"/>
        </FormGroup>

        <FormGroup Class="mt-3">
        <Label Class="mt-3"><b>Foto para perfil (resolunção recomendada 480px x 480px)</b></Label>
        <Input type="file" id="foto-perfil"/>
        </FormGroup>

        <FormGroup Class="mt-3">
        <Label Class="mt-3"><b>Foto ilustrativa da entidade (resolução recomendada: 1080px x 720px)</b></Label>
        <Input type="file" id="foto-ilustrativa"/>
        </FormGroup>
        
        <div Class="mt-3">
        <Button Class="btn btn-primary btn-lg mt-3" type="submit">Finalizar alteração</Button><br></br>
        <Input Class="btn btn-primary btn-lg mt-3" type="reset" value="Limpar campos"></Input>
        </div>
       </Form>
  );
}

    var Nome = "Casa do perdão, misericórdia e ajuda de Tupã"
    var NomePerfil = "Casa do Perdão"
    var Cnpj = 111111111111 
    var Presidente = "Todos nós"
    var Rua = "rua dos bobos"
    var Numero = 0
    var Bairro = "Jardim de inverno"
    var Cep = 17777777
    var Telefone = 14999999999
    var Email = "casadoperdao@misericordia.com"
    var EmailLogin = "casadoperdao@social.com"
    var LinkSite = "www.casadoperdao.com"
    var LinkFacebook = "www.facebook.com/"
    var LinkInstagram = "www.instagram.com/"
    var LinkYoutube = "www.youtube.com/" 

export default App;