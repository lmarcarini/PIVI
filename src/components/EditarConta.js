import React, {useState} from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'

export default function EditarConta() {
    const {updatePassword} = useAuth()
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading]=useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        let form = e.target
        let password=form.password.value
        let passwordConfirmed=form.passwordConfirmed.value
        if(password!==passwordConfirmed) {
            return setError("Senhas não conferem")
        }
        if(password!=="" && password.length<6){
            return setError("Senhas precisa ter no mínimo seis caracteres")
        }
        try{
            setError("")
            setMessage("")
            setLoading(true)
            await updatePassword(password)
            setMessage("Dados alterados com sucesso")
        }catch{
            setError("Não foi possível alterar a conta")
        }
        setLoading(false)
    }

    return (

        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Alterar dados</h2>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nova Senha</Form.Label>
                        <Form.Control type="password" name="password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirme a Senha</Form.Label>
                        <Form.Control type="password" name="passwordConfirmed" />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Confirmar alteração</Button>
                </Form>
            </Card.Body>
        </Card>

    )
}
