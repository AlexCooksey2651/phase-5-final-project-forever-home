import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Container, Button, Stack, Alert } from 'react-bootstrap'

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()
    

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    email,
                    password
                }
            ),
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        onLogin(user)
                        navigate('/home')
                    })
                } else {
                    r.json().then(data => setErrors(data.errors));
                }
            });
    }

    return (
        <Container>
            <Form id="login-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><b>Email Address:</b></Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><b>Password:</b></Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="outline-dark" type="submit">
                        Login
                    </Button>
                </Stack>
                <br />
                {errors ? <Form.Group>
                    {errors.map(error => {
                        return (
                            <Alert key={error}>
                                {error}
                            </Alert>
                        )
                    })}
                </Form.Group> : null}
            </Form>
        </Container>
    )
}

export default LoginForm