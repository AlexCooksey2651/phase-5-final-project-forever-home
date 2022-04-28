import React, { useState } from 'react'
import { Container, Card, Accordion, Stack, Button, Modal } from 'react-bootstrap'

// const exampleApplication = {
//     pet: {
//         id: 1,
//         name: "Sparky",
//         image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//         bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//         age: 2,
//         ageUnit: "years",
//         species: "Dog",
//         status: "Adoption Pending",
//         shelter: {
//             name: "Awesome Dogs and Cats",
//             bio: "We carry lots of Cats and Dogs in NYC",
//             user: {
//                 email: "acooksey.hp@gmail.com",
//                 password: "hello",
//                 city: "New York City",
//                 state: "NY",
//                 phone_number: "+13148829097",
//                 profile_type: "shelter",
//             }
//         }
//     },
//     customer: {
//         first_name: "Alex",
//         last_name: "Cooksey",
//         interested_in: ["Dog", "Cat", "Bird"],
//         user: {
//             email: "aecooksey2651@gmail.com",
//             password: "hello",
//             city: "Jersey City",
//             state: "NJ",
//             phone_number: "+17203018361",
//             profile_type: "customer",
//         },
//     },
//     date: "March 22, 2022",
//     customer_text: "I'll be a great pug dad!",
//     application_status: "Pending"
// }

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