
import './App.css';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';


function App() {
  return (
    <Form className="defaut">
      <h1 className="text-center">PIVI</h1>
      <h2 className="text-center">Editar cadastro de usuário</h2>
      
        <FormGroup>
        <Label class="mt-3"><b>Aterar nome</b></Label>
        <Input type="text" placeholder={Nome}></Input>
        </FormGroup>

        <FormGroup>
        <Label><b>Alterar CPF</b></Label>
        <Input type="text" placeholder={Cpf}/>
        </FormGroup>

        <FormGroup>
        <Label><b>Nome do usuário a ser exibido na plataforma</b></Label>
        <Input type="text" placeholder={NomePerfil}/>
        </FormGroup>

        <FormGroup>
        <Label><b>E-mail para acessar a plataforma(Atual: {EmailLogin})</b></Label>
        <Input type="email" placeholder="E-mail para acesso"/>
        </FormGroup>

        <h4 class="mt-3">Alterar senha</h4>

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

                
        <div Class="mt-3">
        <Button Class="btn btn-primary btn-lg mt-3" type="submit">Finalizar alteração</Button><br></br>
        <Input Class="btn btn-primary btn-lg mt-3" type="reset" value="Limpar campos"></Input>
        </div>
       </Form>
  );
}

    var Nome = "Doador Solidário 01"
    var Cpf = 11111111111
    var NomePerfil = "Solidário Amo Tupã"
    var EmailLogin = "solidario_doador@doacao.com"
    

export default App;