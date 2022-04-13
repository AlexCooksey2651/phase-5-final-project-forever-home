import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

const ShelterSignupForm = () => {
    const [shelterName, setShelterName] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    return (
        <Container>
            <Form.Group>
                <Form.Label><b>Shelter Name:</b></Form.Label>
                <Form.Control type="text" placeholder="Enter Shelter Name" value={shelterName} onChange={e => setShelterName(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Shelter Bio:</b></Form.Label>
                <Form.Control as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Email Address:</b></Form.Label>
                <Form.Control type="email" placeholder="Enter Shelter Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><b>Password:</b></Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                <Form.Label><b>Confirm Password:</b></Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
            </Form.Group>
        </Container>
    )
}

export default ShelterSignupForm;