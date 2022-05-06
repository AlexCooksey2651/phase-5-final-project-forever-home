import React, { useState } from 'react'
import { Container, Card, Button, Stack, Modal, Accordion, Alert, ModalBody } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import EditPetForm from './shelter_components/EditPetForm'
import AdoptionAppForm from './customer_components/AdoptionAppForm'
import ContactForm from './ContactForm'
import { Navigate } from 'react-router-dom'

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

function PetCard({ pet, user, handleUpdatePet, handleDeletePet }) {
    const userType = user.profile.type
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const [showEdit, setShowEdit] = useState(false)
    const showEditForm = () => setShowEdit(true)
    const closeEditForm = () => setShowEdit(false)

    const [showDelete, setShowDelete] = useState(false)
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelete = () => setShowDelete(false)

    const [showContact, setShowContact] = useState(false)
    const showContactForm = () => setShowContact(true)
    const closeContactForm = () => setShowContact(false)


    const customerId = () => {
        if (userType === "customer") {
            return user.profile.customer.id
        } else {
            return null
        }
    }

    // const [bookmarked, setBookmarked] = useState(false)
    // const [bookmarkInfo, setBookmarkInfo] = useState(null)

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
                customer_id: customerId()
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(bookmark => {
                        console.log(bookmark)
                        isBookmarked()
                    })
                } else {
                    r.json().then(errors => setErrors(errors))
                }
            })
    }

    function deleteBookmark() {
        fetch(`/bookmarks/${customerId()}/${pet.id}`, {
            method: "DELETE",
        })
        isBookmarked()
    }

    const isBookmarked = () => {
        if (userType === "customer" && user.profile.customer.bookmarks.length > 0) {
            const bookmarks = user.profile.customer.bookmarks
            const found = bookmarks.find(bookmark => bookmark.pet_id === pet.id)
            if (found) {
                return true
            } else {
                return false
            }
        } else {
            console.log("hello")
        }
    }

    const hasApplications = () => {
        if (userType === "customer" && user.profile.customer.pet_applications.length > 0) {
            const applications = user.profile.customer.pet_applications
            const found = applications.find(application => application.pet_id === pet.id)
            if (found) {
                return true
            } else {
                return false
            }
        } else {
            console.log('hello')
        }
    }
    // isBookmarked()

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
                                <Card.Text>Age: {pet.age} {pet.age_unit} old</Card.Text>

                                <Card.Text>
                                    <b>Pet Bio:</b>
                                    <br />
                                    {pet.bio}
                                </Card.Text>
                                <Card.Text>Adoption Status: {pet.adoption_status}</Card.Text>
                                <Stack gap={2} className="col-md-5 mx-auto">
                                    <Container>
                                        <Button variant="outline-dark" onClick={showEditForm}>
                                            Edit Pet Information
                                        </Button>

                                        <Modal show={showEdit} onHide={closeEditForm} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Pet Information:</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <EditPetForm pet={pet} handleUpdatePet={handleUpdatePet} closeEditForm={closeEditForm}/>
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
                                <Card.Text>Age: {pet.age} {pet.age_unit} old</Card.Text>
                                <Card.Text>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Shelter: {pet.shelter.name} </Accordion.Header>
                                            <Accordion.Body>
                                                <p>Email: {pet.shelter.user.email}</p>
                                                <p>Phone Number: {formatPhoneNum(pet.shelter.user.phone_number)}</p>
                                                <Container>
                                                    <Button variant="outline-dark" onClick={showContactForm}>
                                                        Contact Shelter
                                                    </Button>
                                                    <Modal show={showContact} onHide={closeContactForm} animation={false}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Contact Shelter</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <ContactForm sender={user} recipient={pet.shelter} />
                                                        </Modal.Body>
                                                    </Modal>
                                                </Container>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Text>
                                <Card.Text>
                                    <b>Pet Bio:</b>
                                    <br />
                                    {pet.bio}
                                </Card.Text>

                                <Card.Text>Adoption Status: {pet.adoption_status}</Card.Text>
                                <Stack gap={2} className="col-md-5 mx-auto">
                                    <Container>
                                        {isBookmarked() ? 
                                            <Button variant="dark" onClick={deleteBookmark}>
                                                Bookmarked
                                            </Button> : 
                                            <Button variant="outline-dark" onClick={postBookmark}>
                                                Bookmark
                                            </Button>}
                                        {/* <Button variant={isBookmarked() ? "dark" : "outline-dark"} onClick={isBookmarked() ? (() => deleteBookmark()) : (() => postBookmark())}>
                                            {isBookmarked() ? "Bookmarked" : "Bookmark"}
                                        </Button> */}
                                    </Container>
                                    
                                    <Container>
                                        {hasApplications() ?
                                            <Button variant="dark">
                                                Already Applied
                                            </Button> :
                                            <>
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
                                            </>
                                        }
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
