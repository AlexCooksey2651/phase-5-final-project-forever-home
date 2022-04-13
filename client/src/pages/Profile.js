import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import EditProfileForm from "../components/EditProfileForm"
import ListGroup from "react-bootstrap/ListGroup"
import { NavigationType } from 'react-router-dom'

const shelter = {
    shelterName: "Kitty Kind",
    bio: "we love all animals around here and just want to help them find homes! find us near Union Square in NYC",
    city: "New York City",
    state: "NY",
    user: {
        email: "hello@gmail.com",
        password: "super"
    }
}

const Profile = () => {
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)


    const handleShowEdit = () => setShowModal(true)
    const handleCloseEdit = () => setShowModal(false)
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelete = () => setShowDelete(false)

    return (
        <div>
            <h2>ACCOUNT INFORMATION</h2>
            <Container id="profile-container">
                <ListGroup variant="flush">
                    <ListGroup.Item>Name: {shelter.shelterName}</ListGroup.Item>
                    <ListGroup.Item>Location: {shelter.city}, {shelter.state}</ListGroup.Item>
                    <ListGroup.Item>Email Address: {shelter.user.email}</ListGroup.Item>
                    {/* <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item> */}
                    <ListGroup.Item>Bio: {shelter.bio}</ListGroup.Item>
                </ListGroup>


            </Container>


            <Stack gap={2} className="col-md-5 mx-auto">
                <Container>
                    <Button variant="outline-dark" onClick={handleShowEdit}>
                        Edit Profile Information
                    </Button>

                    <Modal show={showModal} onHide={handleCloseEdit} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Account Information:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditProfileForm shelter={shelter} />
                        </Modal.Body>
                    </Modal>
                </Container>
                <Container>
                    <Button variant="outline-dark" onClick={handleShowDelete}>
                        Delete Account
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
        </div>
    )
}

export default Profile