import React, { useState } from 'react'
import { Form, Container, Button, Alert } from 'react-bootstrap'

function ContactForm({ sender, recipient }) {
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])

    const name = () => {
        if (sender.profile.type === "customer") {
            const fullName = `${sender.profile.customer.first_name} ${sender.profile.customer.last_name}`
            return fullName
        } else if (sender.profile.type === "shelter") {
            return sender.profile.shelter.name
        }
    }

    return (
        <Container>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Name:</b></Form.Label>
                    <Form.Control disabled type="text" value={name()}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Email:</b></Form.Label>
                    <Form.Control disabled type="email" value={sender.email}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Recipient:</b></Form.Label>
                    <Form.Control disabled type="email" value={recipient.user.email}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Message:</b></Form.Label>
                    <Form.Control required maxlength="400" as="textarea" rows={4} value={message} onChange={e => setMessage(e.target.value)}></Form.Control>
                </Form.Group>

                <br />
                <Button variant="outline-dark" type="submit">
                    Send
                </Button>
                <br />
                {errors ? <Form.Group>
                    {errors.map(error => {
                        return (
                            <Alert key={error}>
                                {error}
                            </Alert>
                        )
                    })}
                </Form.Group> : null}
            </Form>
        </Container>
    )
}

export default ContactForm