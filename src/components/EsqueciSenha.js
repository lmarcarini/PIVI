import React, {useState} from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'

export default function EsqueciSenha() {
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading]=useState(false)


    async function handleSubmit(e){
        e.preventDefault()
        let form = e.target
        let email=form.email.value
        try{
            setLoading(true)
            setError("")
            setMessage("")
            await resetPassword(email)
            setMessage("Verifique seu email")
        }catch{
            setError("Não foi possível fazer o resetar a senha para o email informado")
        }
        setLoading(false)
    }

    return (

        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Resetar a senha</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Enviar pedido</Button>
                </Form>
            </Card.Body>
        </Card>

    )
}
