import React, { useState } from 'react'
import { Container, Card, Accordion, Stack, Button, Modal } from 'react-bootstrap'

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

function CustomerApplicationCard({ withdraw, application, user, handleRemoveApplication }) {
    const [showModal, setShowModal] = useState(false)
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

    function deleteApplication() {
        fetch(`/pet_applications/${application.id}`, {
            method: "DELETE"
        })
        handleRemoveApplication(application)
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
                                Application Status: {application.status}
                            </Card.Text>
                            {isApproved() ? <Card.Text>
                                Adoption Date: {cleanupDate(application.pet.adoption_date)}
                            </Card.Text> : null}
                            <Card.Text>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Shelter: {shelter.name} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {shelter.user.email}</p>
                                            <p>Phone Number: {formatPhoneNum(shelter.user.phone_number)}</p>
                                            <Button variant="outline-dark">Contact Shelter</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                            <Card.Text>
                                Application:
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