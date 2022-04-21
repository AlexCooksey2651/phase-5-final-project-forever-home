import React, { useState, useContext } from 'react'
import { Container, Modal, Button, Stack } from 'react-bootstrap'
import EditCustomerProfileForm from "../components/customer_components/EditCustomerProfileForm"
import ListGroup from "react-bootstrap/ListGroup"
import { UserContext } from '../context/user'
import EditShelterProfileForm from '../components/shelter_components/EditShelterProfileForm'

function Profile({ handleLogout, errors, user }) {
    // const { user } = useContext(UserContext)

    const isCustomer = () => {
        if (user.profile.type === "customer") {
            return true
        } else if (user.profile.type === "shelter") {
            return false
        }
    }

    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

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

    function handleDeleteProfile() {
        handleLogout()
        if (user.profile.type === "customer") {
            fetch(`/customers/${user.profile.customer.id}`, {
                method: "DELETE",
            }) 
        } else if (user.profile.type === "shelter") {
            fetch(`/shelters/${user.profile.id}`, {
                method: "DELETE",
            })
        }    
    }

    return (
        <Container id="profile-container">
            <br/>
            <h2>ACCOUNT INFORMATION</h2>
            <br/>
            {isCustomer() ?
                <Container >
                    <ListGroup variant="flush">
                        <ListGroup.Item>Name: {`${user.profile.customer.first_name} ${user.profile.customer.last_name}`}</ListGroup.Item>
                        <ListGroup.Item>Location: {user.city}, {user.state}</ListGroup.Item>
                        <ListGroup.Item>Phone: {formatPhoneNum(user.phone_number)}</ListGroup.Item>
                        <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                        {/* <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item> */}
                        <ListGroup.Item>Looking For: {user.profile.customer.interested_in.join(', ')}</ListGroup.Item>
                    </ListGroup>
                </Container> :
                <Container >
                    <ListGroup variant="flush">
                        <ListGroup.Item>Name: {user.profile.shelter.name}</ListGroup.Item>
                        <ListGroup.Item>Location: {user.city}, {user.state}</ListGroup.Item>
                        <ListGroup.Item>Phone: {formatPhoneNum(user.phone_number)}</ListGroup.Item>
                        <ListGroup.Item>Email Address: {user.email}</ListGroup.Item>
                        {/* <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item> */}
                        <ListGroup.Item>Bio: {user.profile.shelter.bio}</ListGroup.Item>
                    </ListGroup>
                </Container>
            }

            <br />
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
                            {isCustomer() ? <EditCustomerProfileForm user={user} /> : <EditShelterProfileForm user={user}/> }
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
                            <Button variant="outline-dark" onClick={() => handleDeleteProfile()}>
                                Confirm
                            </Button>
                        </Modal.Body>
                    </Modal>
                </Container>
            </Stack>

        </Container>
    )
}

export default Profile