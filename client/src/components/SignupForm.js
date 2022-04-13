import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import ShelterSignupForm from './shelter_components/ShelterSignupForm'
import Button from 'react-bootstrap/Button'

const SignupForm = () => {
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
                {isCustomer ? null : <ShelterSignupForm />}
                <Button variant="outline-dark">
                    Submit
                </Button>
            </Form>
        </Container>

    )
}

export default SignupForm