import React, { useState } from 'react'
import { Form, Container } from 'react-bootstrap'
import ShelterSignupForm from './shelter_components/ShelterSignupForm'
import CustomerSignupForm from './customer_components/CustomerSignupForm'

function SignupForm({ onLogin }) {
    const [profileType, setProfileType] = useState("customer")

    const customer = () => {
        if (profileType === "customer") {
            return true
        } else if (profileType === "shelter") {
            return false
        }
    }

    return (
        <Container id="signup-form">
            <p id="profile-select-label"><b>Select Account Type:</b></p>
            <Form id="profile-select">
                <Form.Group className="mb-3">
                    <Form.Check
                        type="radio"
                        id="customer-radio"
                        label="Sign Up As Customer"
                        checked={profileType === "customer"}
                        onChange={() => setProfileType("customer")}
                    />
                    <Form.Check
                        type="radio"
                        label="Sign Up As Shelter"
                        id="shelter-radio"
                        checked={profileType === "shelter"}
                        onChange={() => setProfileType("shelter")}
                    />
                </Form.Group>
            </Form>
            <br/>
            {customer() ? <CustomerSignupForm onLogin={onLogin} /> : <ShelterSignupForm onLogin={onLogin}/>}
        </Container>

    )
}

export default SignupForm