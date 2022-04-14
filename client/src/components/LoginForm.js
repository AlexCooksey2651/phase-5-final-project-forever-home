import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Container>
            <Form id="login-form">
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
            </Form>
        </Container>
    )
}

export default LoginForm