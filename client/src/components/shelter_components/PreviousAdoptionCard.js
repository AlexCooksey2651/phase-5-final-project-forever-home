import React, { useState } from 'react'
import { Container, Card, Button, Accordion, Modal } from 'react-bootstrap'
import ContactForm from '../ContactForm'

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

function PreviousAdoptionCard({ pet, user }) {
    const [showContact, setShowContact] = useState(false)
    const [errors, setErrors] = useState([])
    const matchingApplication = pet.pet_applications.find(application => application.status === "Approved")
    const customer = matchingApplication.customer

    const showContactForm = () => setShowContact(true)
    const closeContactForm = () => setShowContact(false)

    function cleanupDate(date) {
        const year = date.substr(0, 4)
        const month = date.substr(5, 2)
        const day = date.substr(8, 2)
        return `${month}/${day}/${year}`
    }

    return (
        <Container>
            <Card className="application-card">
                <div className="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="application-card-image" src={pet.image} />
                    </div>
                    <div className="col-md-8">
                        <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Text>Adoption Date: {cleanupDate(pet.adoption_date)}</Card.Text>
                            <Card.Text>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Customer: {customer.first_name} {customer.last_name} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {customer.user.email}</p>
                                            <p>Phone Number: {formatPhoneNum(customer.user.phone_number)}</p>
                                            {/* <Button variant="outline-dark">Contact Customer</Button> */}
                                            <Container>
                                                <Button variant="outline-dark" onClick={showContactForm}>
                                                    Contact Customer
                                                </Button>
                                                <Modal show={showContact} onHide={closeContactForm} animation={false}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Contact Customer</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <ContactForm sender={user} recipient={customer} />
                                                    </Modal.Body>
                                                </Modal>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default PreviousAdoptionCard