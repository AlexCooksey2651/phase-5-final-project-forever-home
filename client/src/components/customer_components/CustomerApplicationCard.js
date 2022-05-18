import React, { useState } from 'react'
import { Container, Card, Accordion, Stack, Button, Modal } from 'react-bootstrap'
import ContactForm from '../ContactForm'
import { formatPhoneNum, cleanupDate } from '../../Resources'

function CustomerApplicationCard({ withdraw, application, user, handleRemoveApplication }) {
    const [showModal, setShowModal] = useState(false)
    const [showContact, setShowContact] = useState(false)
    
    const pet = application.pet
    const shelter = application.pet.shelter
    const isApproved = () => {
        if (application.status === "Approved") {
            return true
        } else {
            return false
        }
    }

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)
    const showContactForm = () => setShowContact(true)
    const closeContactForm = () => setShowContact(false)

    function deleteApplication() {
        fetch(`/pet_applications/${application.id}`, {
            method: "DELETE"
        })
        handleRemoveApplication(application)
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
                            <Card.Title><h2>{pet.name}</h2></Card.Title>
                            <Card.Text><b>Application Date:</b> {cleanupDate(application.created_at)}</Card.Text>
                            <Card.Text>
                                <b>Application Status:</b> {application.status}
                            </Card.Text>
                            {isApproved() ? <Card.Text>
                                <b>Adoption Date:</b> {cleanupDate(application.pet.adoption_date)}
                            </Card.Text> : null}
                            <Card.Text>
                                <Accordion className="contact-dropdown">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Shelter: {shelter.name} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {shelter.user.email}</p>
                                            <p>Phone Number: {formatPhoneNum(shelter.user.phone_number)}</p>
                                            {/* <Button variant="outline-dark">Contact Shelter</Button> */}
                                            <Container>
                                                    <Button variant="outline-dark" onClick={showContactForm}>
                                                        Contact Shelter
                                                    </Button>
                                                    <Modal  show={showContact} onHide={closeContactForm} animation={false}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Contact Shelter</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <ContactForm sender={user} recipient={pet.shelter} petName={pet.name} closeContactForm={closeContactForm}/>
                                                        </Modal.Body>
                                                    </Modal>
                                                </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                            <Card.Text>
                                <b>Application Message:</b>
                                <br />
                                <em>{application.customer_text}</em>
                            </Card.Text>
                            <Stack gap={2} className="col-md-5 mx-auto">
                                {withdraw ?
                                    <>
                                        <Button variant="outline-dark" onClick={() => handleShowModal()}>
                                            Withdraw Application
                                        </Button>
                                        <Modal aria-labelledby="contained-modal-title-vcenter"
                                            centered show={showModal} onHide={handleCloseModal} animation={false}>
                                            <Modal.Body>
                                                <Modal.Header closeButton style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                    <Modal.Title className="are-you-sure">Are You Sure?</Modal.Title>
                                                </Modal.Header>
                                                <Stack>
                                                    <Button variant="outline-dark" onClick={() => deleteApplication()}>
                                                        Confirm
                                                    </Button>
                                                </Stack>
                                            </Modal.Body>
                                        </Modal>
                                    </> : null}
                            </Stack>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </Container>
    )
}


export default CustomerApplicationCard