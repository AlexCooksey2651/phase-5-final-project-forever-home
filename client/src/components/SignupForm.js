import React, { useState } from 'react'
import { Form, Container, Stack, Button } from 'react-bootstrap'
import ShelterSignupForm from './shelter_components/ShelterSignupForm'
import CustomerSignupForm from './customer_components/CustomerSignupForm'

function SignupForm() {
    const [profileType, setProfileType] = useState("customer")
    const [profileData, setProfileData] = useState({})

    const isCustomer = () => {
        if (profileType === "customer") {
            return true
        } else if (profileType === "shelter") {
            return false
        }
    }
    return (
        <Container id="signup-form">
            <Form>
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
            {isCustomer() ? <CustomerSignupForm setProfileData={setProfileData}/> : <ShelterSignupForm setProfileData={setProfileData}/>}
        </Container>

    )
}

export default SignupForm