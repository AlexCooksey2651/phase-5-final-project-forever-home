import React, { useState } from 'react'
import { Form, Container, Stack, Button } from 'react-bootstrap'
import ShelterSignupForm from './shelter_components/ShelterSignupForm'
import CustomerSignupForm from './customer_components/CustomerSignupForm'

function SignupForm() {
    const [profileType, setProfileType] = useState("customer")
    const [profileData, setProfileData] = useState({})
    
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
                {isCustomer ? <CustomerSignupForm /> : <ShelterSignupForm />}
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="outline-dark">
                        Submit
                    </Button>
                </Stack>
            </Form>
        </Container>

    )
}

export default SignupForm