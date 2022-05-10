import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button, Accordion, Stack, Alert, Modal } from 'react-bootstrap'
import ContactForm from '../ContactForm'

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

function ShelterApplicationCard({ application, handleUpdateApplication, user, active }) {
    const [showContact, setShowContact] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const showContactForm = () => setShowContact(true)
    const closeContactForm = () => setShowContact(false)

    const pet = application.pet
    const customer = application.customer

    function adoptPet() {
        fetch(`/pets/${pet.id}/applications/${application.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...application,
                status: "Approved"
            })
        }).then((r) => {
            if (r.ok) {
                r.json().then(application => handleUpdateApplication(application))
                navigate('/previous-adoptions')
            } else {
                r.json().then(data => setErrors(data.errors))
            }
        })
    }

    function denyApplication() {
        fetch(`/pet_applications/${application.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...application,
                status: "We're sorry, but your application has been denied"
            })
        }).then((r) => {
            if (r.ok) {
                r.json().then(application => handleUpdateApplication(application))
            } else {
                r.json().then(data => setErrors(data.errors))
            }
        })
    }

    function cleanupDate(date) {
        const year = date.substr(0, 4)
        const month = date.substr(5, 2)
        const day = date.substr(8, 2)
        return `${month}/${day}/${year}`
    }

    return (
        <Container>
            <Card className="application-card">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="application-card-image" src={pet.image} alt="pet picture" />
                    </div>
                    <div class="col-md-8">
                        <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Text>Application Date: {cleanupDate(application.created_at)}</Card.Text>
                            <Card.Text>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Customer: {`${customer.first_name} ${customer.last_name}`} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {customer.user.email}</p>
                                            <p>Phone Number: {formatPhoneNum(customer.user.phone_number)}</p>
                                            <Container>
                                                <Button variant="outline-dark" onClick={showContactForm}>
                                                    Contact Customer
                                                </Button>
                                                <Modal show={showContact} onHide={closeContactForm} animation={false}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Contact Customer</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <ContactForm sender={user} recipient={customer} petName={pet.name}/>
                                                    </Modal.Body>
                                                </Modal>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                            <Card.Text>
                                Application:
                                <br />
                                <em>{application.customer_text}</em>
                            </Card.Text>
                            {active ? 
                            <Stack gap={2} className="col-md-5 mx-auto">
                                <Button variant="outline-dark" onClick={() => adoptPet()}>Approve Application</Button>
                                <Button variant="outline-dark" onClick={() => denyApplication()}>Deny Application</Button>
                            </Stack> : null}
                            <br />
                            {errors ? <Container>
                                {errors.map(error => {
                                    return (
                                        <Alert key={error}>
                                            {error}
                                        </Alert>
                                    )
                                })}
                            </Container> : null}
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default ShelterApplicationCard
