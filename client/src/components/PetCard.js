import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import EditPetForm from './shelter_components/EditPetForm'
import AdoptionAppForm from './customer_components/AdoptionAppForm'


// const pet = {
//     name: "Sparky",
//     image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//     bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//     age: 2,
//     ageUnit: "years",
//     species: "Dog",
//     status: "Available"
// }

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

const PetCard = ({ pet, user }) => {
    const userType = user.profile_type
    const [bookmarked, setBookmarked] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelete = () => setShowDelete(false)

    if (userType === "shelter") {
        return (
            <Container>
                <Card className="application-card" bg="light">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <Card.Img className="pet-card-image" src={pet.image} />
                        </div>
                        <div className="col-md-8">
                            <Card.Body>
                                <Card.Title><h2>{pet.name}</h2></Card.Title>
                                <Card.Text>Species: {pet.species}</Card.Text>
                                <Card.Text>Age: {pet.age} {pet.ageUnit} old</Card.Text>

                                <Card.Text>
                                    <b>Pet Bio:</b>
                                    <br />
                                    {pet.bio}
                                </Card.Text>
                                <Card.Text>Adoption Status: {pet.status}</Card.Text>
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
                                                <EditPetForm pet={pet} />
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
    } else if (userType === "customer") {
        return (
            <Container>
                <Card className="application-card" bg="light">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <Card.Img className="pet-card-image" src={pet.image} />
                        </div>
                        <div className="col-md-8">
                            <Card.Body>
                                <Card.Title><h2>{pet.name}</h2></Card.Title>
                                <Card.Text>Species: {pet.species}</Card.Text>
                                <Card.Text>Age: {pet.age} {pet.ageUnit} old</Card.Text>
                                <Card.Text>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Shelter: {pet.shelter.name} </Accordion.Header>
                                            <Accordion.Body>
                                                <p>Email: {pet.shelter.user.email}</p>
                                                <p>Phone Number: {formatPhoneNum(pet.shelter.user.phone_number)}</p>
                                                <Button variant="outline-dark">Contact Shelter</Button>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Text>
                                <Card.Text>
                                    <b>Pet Bio:</b>
                                    <br />
                                    {pet.bio}
                                </Card.Text>
                                
                                <Card.Text>Adoption Status: {pet.status}</Card.Text>
                                <Stack gap={2} className="col-md-5 mx-auto">
                                    <Container>
                                        <Button variant={bookmarked ? "dark" : "outline-dark"} onClick={() => setBookmarked(!bookmarked)}>
                                            {bookmarked ? "Bookmarked" : "Bookmark"}
                                        </Button>

                                        {/* <Modal show={showModal} onHide={handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Pet Information:</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <EditPetForm pet={pet} />
                                            </Modal.Body>
                                        </Modal> */}
                                    </Container>
                                    <Container>
                                        <Button variant="outline-dark" onClick={handleShowDelete}>
                                            Apply to Adopt {pet.name}
                                        </Button>
                                        <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Adoption Application Form</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <AdoptionAppForm pet={pet} user={user} />
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
}

export default PetCard

// NOTES
// VIEW ANIMAL DATA, ASSOCIATED APPLICATIONS (+ number), REMOVE LISTING, EDIT LISTING (edit status as separate button?)
