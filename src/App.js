import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard"
import {AuthProvider} from './context/AuthContext'
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Login from "./components/Login";
import EsqueciSenha from "./components/EsqueciSenha";
import EditarConta from "./components/EditarConta";
import TopMenu from "./components/TopMenu";
import CadastroEntidades from "./components/CadastroEntidades"
import EditarCadastroEntidades from "./components/EditarCadastroEntidades";
import ListaEntidades from "./components/ListaEntidades";
import PerfilEntidade from "./components/PerfilEntidade";
import ListaCurtidas from "./components/ListaCurtidas";



function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <TopMenu/>
          <Container className="d-flex align-items-top justify-content-center" style={{minHeight:"100vh"}}>
            <div className="w-100" >
                  <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/resetarsenha" component={EsqueciSenha}/>
                    <Route path="/editarconta" component={EditarConta}/>
                    <Route path="/cadastrarentidade" component={CadastroEntidades}/>
                    <Route path="/editarentidade" component={EditarCadastroEntidades}/>
                    <Route path="/minhasentidades" component={ListaEntidades}/>
                    <Route path="/perfil" component={PerfilEntidade}/>
                    <Route path="/favoritos" component={ListaCurtidas}/>
                  </Switch>
            </div>
          </Container>
        </Router>
      </AuthProvider>
    </>
    
    
  );
}

export default App;
