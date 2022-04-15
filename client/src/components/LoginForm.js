import React, { useState } from 'react'
import { Form, Container, Button, Stack } from 'react-bootstrap'

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