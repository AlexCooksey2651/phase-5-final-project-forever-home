import React, { useState, useContext } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { UserContext } from '../../context/user'

function AdoptionAppForm({ pet, user }) {
    // const { user } = useContext(UserContext)
    const [applicationText, setApplicationText] = useState("")
    const fullName = `${user.profile.customer.first_name} ${user.profile.customer.last_name}`
    const today = new Date().toLocaleDateString()
    const [errors, setErrors] = useState([])

    function submitApplication(e) {
        e.preventDefault()
        fetch('/applications', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customer_id: user.profile.customer.id,
                pet_id: pet.id,
                date: today,
                customer_text: applicationText,
                status: "Pending"
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then(application => console.log(application))
                } else {
                    r.json().then(errors => setErrors(errors))
                }
            })
    }

    return (
        <Container>
            <Form onSubmit={submitApplication}>
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
                    <Form.Control as="textarea" rows={4} value={applicationText} onChange={e => setApplicationText(e.target.value)} />
                </Form.Group>
                <br />
                <Button variant="outline-dark" type="submit">
                    Submit Application
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

export default AdoptionAppForm