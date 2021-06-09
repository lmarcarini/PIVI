import React, {useState} from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'


 export default function Signup() {
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading]=useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        let form = e.target
        let email=form.email.value
        let password=form.password.value
        let passwordConfirmed=form.passwordConfirmed.value
        if(password!==passwordConfirmed) {
            return setError("Senhas não conferem")
        }
        if(password.length<6){
            return setError("Senhas precisa ter no mínimo seis caracteres")
        }
        try{
            setError("")
            setLoading(true)
            await signup(email, password)
            history.push("/")
        }catch{
            setError("Não foi possível criar a conta")
        }
        setLoading(false)
    }

    return (

        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Inscreva-se</h2>
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
                    <Form.Group>
                        <Form.Label>Confirme a Senha</Form.Label>
                        <Form.Control type="password" name="passwordConfirmed" required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Registrar Conta</Button>
                </Form>
            </Card.Body>
            <div className="w-100 text-center mt-2">
                Já tem uma conta? <Link to="/login">Entre por aqui</Link>
            </div>
        </Card>

    )
}


