import React, { useState, useContext } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { UserContext } from '../../context/user'

function AdoptionAppForm({ pet }) {
    const { user } = useContext(UserContext)
    const [appText, setAppText] = useState("")
    const fullName = `${user.profile.first_name} ${user.profile.last_name}`
    const today = new Date().toLocaleDateString()

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Pet:</b></Form.Label>
                    <Form.Control disabled type="text" value={pet.name}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Applicant:</b></Form.Label>
                    <Form.Control disabled type="text" value={fullName}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Application Date:</b></Form.Label>
                    <Form.Control disabled value={today}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label><b>Tell us why you'd be a great fit for {pet.name}:</b></Form.Label>
                    <Form.Control as="textarea" rows={4} value={appText} onChange={e => setAppText(e.target.value)} />
                </Form.Group>
                <br/>
                <Button variant="outline-dark" >
                    Submit Application
                </Button>
            </Form>
        </Container>
    )
}

export default AdoptionAppForm