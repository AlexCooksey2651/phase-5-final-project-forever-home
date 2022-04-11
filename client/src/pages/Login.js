import React, { useState } from 'react'
import LoginForm from "../components/LoginForm"
import CustomerSignupForm from "../components/customer_components/CustomerSignupForm"
import ShelterSignupForm from "../components/shelter_components/"

function Login() {
    const [loginPage, setLoginPage] = useState(true)

    //   if (loginPage === "login") {
    //       return <LoginForm />
    //   } else if (loginPage === "new-customer") {
    //       return <CustomerSignupForm />
    //   } else if (loginPage === "new-shelter") {
    //       return <ShelterSignupForm />
    //   }
    
    // function toggleLoginPage() {
    //     setShowSignup(!showSignup)
    // }

    return (
        <div id="login">
            <Header />
            {loginPage ? <LoginForm /> : <SignUpForm />}
        </div>
    )
}

export default Login