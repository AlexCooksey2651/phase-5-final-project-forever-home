import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal'
import EditPetForm from './EditPetForm'


const examplePet = {
    name: "Sparky",
    image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
    bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
    age: 2,
    ageUnit: "years",
    species: "Dog",
    status: "Available"
}

const ShelterPetCard = () => {
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelete = () => setShowDelete(false)

    return (
        <Container>
            <Card className="application-card" bg="light">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <Card.Img className="pet-card-image" src={examplePet.image} />
                    </div>
                    <div className="col-md-8">
                        <Card.Body>
                            <Card.Title><h2>{examplePet.name}</h2></Card.Title>
                            <Card.Text>Species: {examplePet.species}</Card.Text>
                            <Card.Text>Age: {examplePet.age} {examplePet.ageUnit} old</Card.Text>

                            <Card.Text>
                                <b>Pet Bio:</b>
                                <br />
                                {examplePet.bio}
                            </Card.Text>
                            <Card.Text>Adoption Status: {examplePet.status}</Card.Text>
                            <Stack gap={2} className="col-md-5 mx-auto">
                                <Container>
                                    <Button variant="outline-dark" onClick={handleShow}>
                                        Edit Pet Information
                                    </Button>

                                    <Modal show={showModal} onHide={handleClose} animation={false}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Pet Information:</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditPetForm pet={examplePet} />
                                        </Modal.Body>
                                    </Modal>
                                </Container>
                                <Container>
                                    <Button variant="outline-dark" onClick={handleShowDelete}>
                                        Remove Listing
                                    </Button>
                                    <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
                                        <Modal.Body>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Are You Sure?</Modal.Title>
                                            </Modal.Header>
                                            <Button variant="outline-dark">
                                                Confirm
                                            </Button>
                                        </Modal.Body>
                                    </Modal>
                                </Container>

                            </Stack>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default ShelterPetCard

// NOTES
// VIEW ANIMAL DATA, ASSOCIATED APPLICATIONS (+ number), REMOVE LISTING, EDIT LISTING (edit status as separate button?)
