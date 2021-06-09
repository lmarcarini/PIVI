import React, {useState} from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function Login() {
    const {login} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading]=useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        let form = e.target
        let password=form.password.value
        let email=form.email.value
        try{
            setError("")
            setLoading(true)
            await login(email, password)
            history.push("/")
        }catch{
            setError("Não foi possível fazer o login")
        }
        return ()=>setLoading(false)
    }

    return (

        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" name="password" required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit"> Entrar {loading && <Spinner animation="border" />}</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/resetarsenha">Esqueci minha senha</Link>
                </div>
            </Card.Body>
            <div className="w-100 text-center mt-2">
                Ainda não tem uma conta? <Link to="/signup">Inscreva-se aqui</Link>
            </div>
        </Card>

    )
}
