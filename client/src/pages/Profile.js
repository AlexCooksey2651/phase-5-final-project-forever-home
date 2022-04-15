import React, { useState, useContext } from 'react'
import { Container, Modal, Button, Stack } from 'react-bootstrap'
import EditProfileForm from "../components/EditProfileForm"
import ListGroup from "react-bootstrap/ListGroup"
import { UserContext } from '../context/user'

function Profile() {
    const { user } = useContext(UserContext)

    const isCustomer = () => {
        if (user.profile_type === "customer") {
            return true
        } else if (user.profile_type === "shelter") {
            return false
        }
    }

    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    console.log(user.profile.interested_in)
    const handleShowEdit = () => setShowModal(true)
    const handleCloseEdit = () => setShowModal(false)
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelete = () => setShowDelete(false)

    const formatPhoneNum = (phoneNumber) => {
        const arrayedNum = phoneNumber.split('')
        const firstThree = arrayedNum.slice(2, 5).join('')
        const secondThree = arrayedNum.slice(5, 8).join('')
        const lastFour = arrayedNum.slice(-4).join('')
        const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
        return newNumStr
    }

    return (
        <div>
            <h2>ACCOUNT INFORMATION</h2>
            {isCustomer() ?
                <Container id="profile-container">
                    <ListGroup variant="flush">
                        <ListGroup.Item>Name: {`${user.profile.first_name} ${user.profile.last_name}`}</ListGroup.Item>
                        <ListGroup.Item>Location: {user.city}, {user.state}</ListGroup.Item>
                        <ListGroup.Item>Phone: {formatPhoneNum(user.phone_number)}</ListGroup.Item>
                        <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                        {/* <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item> */}
                        <ListGroup.Item>Looking For: {user.profile.interested_in.join(', ')}</ListGroup.Item>
                    </ListGroup>
                </Container> :
                <Container id="profile-container">
                    <ListGroup variant="flush">
                        <ListGroup.Item>Name: {user.profile.name}</ListGroup.Item>
                        <ListGroup.Item>Location: {user.city}, {user.state}</ListGroup.Item>
                        <ListGroup.Item>Phone: {formatPhoneNum(user.phone_number)}</ListGroup.Item>
                        <ListGroup.Item>Email Address: {user.email}</ListGroup.Item>
                        {/* <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item> */}
                        <ListGroup.Item>Bio: {user.profile.bio}</ListGroup.Item>
                    </ListGroup>
                </Container>
            }


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
                            <EditProfileForm user={user} />
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