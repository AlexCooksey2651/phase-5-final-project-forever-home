import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import Header from '../components/Header'


function Login({ onLogin }) {
    const [loginPage, setLoginPage] = useState(true)

    //   if (loginPage === "login") {
    //       return <LoginForm />
    //   } else if (loginPage === "new-customer") {
    //       return <CustomerSignupForm />
    //   } else if (loginPage === "new-shelter") {
    //       return <ShelterSignupForm />
    //   }

    function toggleLoginPage() {
        setLoginPage(!loginPage)
    }

    return (
        <Container id="login">
            <Header />
            {loginPage ? <LoginForm /> : <SignupForm />}
            <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="outline-dark" onClick={toggleLoginPage}>
                    {loginPage ? "Create Account" : "Return to Login Page"}
                </Button>
            </Stack>
        </Container>
    )
}

export default Login