import React, { useState } from 'react'
import { Form, Container, Button, Alert } from 'react-bootstrap'

function ContactForm({ sender, recipient, petName, closeContactForm }) {
    const [message, setMessage] = useState("")
    const [senderType, setSenderType] = useState(sender.profile.type)
    const [pet, setPet] = useState(petName)
    const [errors, setErrors] = useState([])

    const senderName = () => {
        if (senderType === "customer") {
            const fullName = `${sender.profile.customer.first_name} ${sender.profile.customer.last_name}`
            return fullName
        } else if (senderType === "shelter") {
            return sender.profile.shelter.name
        }
    }

    const recipientName = () => {
        if (senderType === "customer") {
            return recipient.name
            // const fullName = `${recipient.profile.customer.first_name} ${recipient.profile.customer.last_name}`
            // return fullName
        } else if (senderType === "shelter") {
            const fullName = `${recipient.first_name} ${recipient.last_name}`
            return fullName
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (senderType === "customer") {
            fetch('/messages', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_id: sender.profile.customer.id,
                    shelter_id: recipient.id,
                    pet_name: pet,
                    message_text: message,
                    sender: senderType,
                })
            })
                .then(r => {
                    if (r.ok) {
                        r.json().then(data => {
                            console.log(data)
                            closeContactForm()
                        })
                    } else {
                        r.json().then(data => setErrors(data.errors));
                    }
                })
            } else if (senderType === "shelter") {
                fetch('/messages', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customer_id: recipient.id,
                        shelter_id: sender.profile.shelter.id,
                        pet_name: pet,
                        message_text: message,
                        sender: senderType,
                    })
                })
                    .then(r => {
                        if (r.ok) {
                            r.json().then(data => {
                                console.log(data)
                                closeContactForm()
                            })
                        } else {
                            r.json().then(data => setErrors(data.errors));
                        }
                    })
            }
    }

    return (
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label><b>From:</b></Form.Label>
                        <Form.Control disabled type="text" value={senderName()}></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label><b>To:</b></Form.Label>
                        <Form.Control disabled type="email" value={recipientName()}></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label><b>Pet:</b></Form.Label>
                        <Form.Control disabled type="text" value={pet}></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label><b>Message:</b></Form.Label>
                        <Form.Control maxlength="400" as="textarea" rows={4} value={message} onChange={e => setMessage(e.target.value)}></Form.Control>
                    </Form.Group>

                    <br />
                    <Button variant="outline-dark" type="submit">
                        Send
                    </Button>
                    <br />
                    <br/>
                    {errors ? <Form.Group>
                        {errors.map(error => {
                            return (
                                <Alert key={error} onClose={() => setErrors([])} dismissible>
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