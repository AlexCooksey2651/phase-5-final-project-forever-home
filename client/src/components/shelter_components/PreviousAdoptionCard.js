import React, { useState } from 'react'
import { Container, Card, Button, Accordion, Modal } from 'react-bootstrap'
import ContactForm from '../ContactForm'
import { formatPhoneNum, cleanupDate } from '../../Resources'

function PreviousAdoptionCard({ pet, user }) {
    const [showContact, setShowContact] = useState(false)
    const matchingApplication = pet.pet_applications.find(application => application.status === "Approved")
    const customer = matchingApplication.customer

    const showContactForm = () => setShowContact(true)
    const closeContactForm = () => setShowContact(false)

    return (
        <Container>
            <Card className="application-card">
                <div className="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="application-card-image" src={pet.image_url} alt="pet picture" />
                    </div>
                    <div className="col-md-8">
                        <Card.Body>
                            <Card.Title><h2>{pet.name}</h2></Card.Title>
                            <Card.Text><b>Adoption Date:</b> {cleanupDate(pet.adoption_date)}</Card.Text>
                            <Card.Text>
                                <Accordion className="contact-dropdown">
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
                                                        <ContactForm sender={user} recipient={customer} petName={pet.name} closeContactForm={closeContactForm}/>
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