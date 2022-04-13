import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"



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
        <div id="login">
            {/* <Header /> */}
            {loginPage ? <LoginForm /> : <SignupForm />}
            <Button onClick={toggleLoginPage}>
                {loginPage ? "Create Account" : "Return to Login Page"}
            </Button>
        </div>
    )
}

export default Login