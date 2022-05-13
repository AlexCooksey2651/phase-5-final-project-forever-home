import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../context/user'
import { Form, Container, Button, Stack, Alert } from 'react-bootstrap'

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()
    // const { user, setUser } = useContext(UserContext)

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
        <div id="login-form">
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><b>Email Address:</b></Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><b>Password:</b></Form.Label>
                        <Form.Control required type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
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
        </div>

    )
}

export default LoginForm