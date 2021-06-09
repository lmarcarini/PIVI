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


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <TopMenu/>
          <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
            <div className="w-100" style={{maxWidth:"400px"}}>
                  <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/resetarsenha" component={EsqueciSenha}/>
                    <Route path="/editarconta" component={EditarConta}/>
                  </Switch>
            </div>
          </Container>
        </Router>
      </AuthProvider>
    </>
    
    
  );
}

export default App;
