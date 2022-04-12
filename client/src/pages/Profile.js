import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import EditProfileForm from "../components/EditProfileForm"
import ListGroup from "react-bootstrap/ListGroup"

const shelter = {
    shelterName: "hello",
    bio: "we love all animals around here and just want to help them find homes! find us near Union Square in NYC",
    user: {
        email: "hello@gmail.com",
        password: "super"
    }
}

const Profile = () => {
    const [showModal, setShowModal] = useState(false)


    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    return (
        <div>
            <h2>ACCOUNT INFORMATION</h2>
            <Container id="profile-container">
                <ListGroup variant="flush">
                    <ListGroup.Item>Name: {shelter.shelterName}</ListGroup.Item>
                    <ListGroup.Item>Email Address: {shelter.user.email}</ListGroup.Item>
                    <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item>
                    <ListGroup.Item>Bio: {shelter.bio}</ListGroup.Item>
                </ListGroup>


            </Container>
            <Container>
                <Button variant="primary" onClick={handleShow}>
                    Edit Profile Information
                </Button>

                <Modal show={showModal} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Account Information:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProfileForm shelter={shelter} />
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    )
}

export default Profile