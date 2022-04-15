import React, { useState } from 'react'
import { Form, Container, Stack, Button } from 'react-bootstrap'
import ShelterSignupForm from './shelter_components/ShelterSignupForm'
import CustomerSignupForm from './customer_components/CustomerSignupForm'

function SignupForm() {
    const [isCustomer, setIsCustomer] = useState(true)

    return (
        <Container id="signup-form">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="radio"
                        id="customer-radio"
                        label="Sign Up As Customer"
                        checked={!!isCustomer}
                        onChange={() => setIsCustomer(true)}
                    />

                    <Form.Check
                        type="radio"
                        label="Sign Up As Shelter"
                        id="shelter-radio"
                        checked={isCustomer === false}
                        onChange={() => setIsCustomer(false)}
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