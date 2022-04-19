import React, { useState } from 'react'
import { Container, Card, Button, Stack, Modal, Accordion, Alert } from 'react-bootstrap'
import EditPetForm from './shelter_components/EditPetForm'
import AdoptionAppForm from './customer_components/AdoptionAppForm'

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

function PetCard({ pet, user, handleUpdatePet, handleDeletePet }) {
    const userType = user.profile_type
    const [bookmarked, setBookmarked] = useState(false)
    const [bookmarkInfo, setBookmarkInfo] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [errors, setErrors] = useState([])

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelete = () => setShowDelete(false)

    function removeListing() {
        fetch(`/pets/${pet.id}`, {
            method: "DELETE"
        })
        handleDeletePet(pet)
    }

    function postBookmark() {
        fetch('/bookmarks/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pet_id: pet.id,
                customer_id: user.profile.id
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(bookmark => {
                        setBookmarkInfo(bookmark)
                        setBookmarked(true)
                    })
                } else {
                    r.json().then(errors => setErrors(errors))
                }
            })
    }

    function deleteBookmark() {
        fetch(`/bookmarks/${bookmarkInfo.id}`, {
            method: "DELETE",
        })
        setBookmarkInfo({})
        setBookmarked(false)
    }

    const isBookmarked = () => {
        if (userType === "customer") {
            const bookmarks = user.profile.bookmarks
            const found = bookmarks.find(bookmark => bookmark.pet.id === pet.id)
            if (found) {
                setBookmarkInfo(found)
                setBookmarked(true)
            } else {
                setBookmarked(false)
            }
        } else {
            console.log("hello")
        }
    }

    isBookmarked()

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
                                                <EditPetForm pet={pet} handleUpdatePet={handleUpdatePet} />
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
                                                <Button variant="outline-dark" onClick={removeListing}>
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
                                        <Button variant={bookmarked ? "dark" : "outline-dark"} onClick={bookmarked ? (() => deleteBookmark()) : (() => postBookmark())}>
                                            {bookmarked ? "Bookmarked" : "Bookmark"}
                                        </Button>

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
                <Container>
                    <br />
                    {errors ? errors.map(error => {
                        return (
                            <Alert key={error}>
                                {error}
                            </Alert>
                        )
                    }) : null}
                </Container>
            </Container>
        )
    }
}

export default PetCard
