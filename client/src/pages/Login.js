import React, { useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import Header from '../components/Header'

function Login({ onLogin }) {
    const [loginPage, setLoginPage] = useState(true)

    function toggleLoginPage() {
        setLoginPage(!loginPage)
    }

    return (
        <div id="login">
            <Container >
                <Header />
                {loginPage ? <LoginForm onLogin={onLogin}/> : <SignupForm onLogin={onLogin} />}
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="outline-dark" onClick={toggleLoginPage}>
                        {loginPage ? "Create Account" : "Return to Login Page"}
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}

export default Login