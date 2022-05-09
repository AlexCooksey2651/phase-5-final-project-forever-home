import React, { useState, useContext } from 'react'
import { Container, Modal, Button, Stack } from 'react-bootstrap'
import EditCustomerProfileForm from "../components/customer_components/EditCustomerProfileForm"
import ListGroup from "react-bootstrap/ListGroup"
import { UserContext } from '../context/user'
import EditShelterProfileForm from '../components/shelter_components/EditShelterProfileForm'

function Profile({ handleLogout, errors, user }) {
    // const { user } = useContext(UserContext)
    const [userInfo, setUserInfo] = useState(user)

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
            fetch(`/shelters/${user.profile.shelter.id}`, {
                method: "DELETE",
            })
        }
    }

    return (
        <Container id="profile-container">
            <br />
            <h2>ACCOUNT INFORMATION</h2>
            <br />
            {isCustomer() ?
                <Container >
                    <ListGroup variant="flush">
                        <ListGroup.Item>Name: {`${userInfo.profile.customer.first_name} ${userInfo.profile.customer.last_name}`}</ListGroup.Item>
                        <ListGroup.Item>Location: {userInfo.city}, {userInfo.state}</ListGroup.Item>
                        <ListGroup.Item>Phone: {formatPhoneNum(userInfo.phone_number)}</ListGroup.Item>
                        <ListGroup.Item>Email: {userInfo.email}</ListGroup.Item>
                        {/* <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item> */}
                        <ListGroup.Item>Looking For: {userInfo.profile.customer.interested_in.join(', ')}</ListGroup.Item>
                    </ListGroup>
                </Container> :
                <Container >
                    <ListGroup variant="flush">
                        <ListGroup.Item>Name: {userInfo.profile.shelter.name}</ListGroup.Item>
                        <ListGroup.Item>Location: {userInfo.city}, {userInfo.state}</ListGroup.Item>
                        <ListGroup.Item>Phone: {formatPhoneNum(userInfo.phone_number)}</ListGroup.Item>
                        <ListGroup.Item>Email Address: {userInfo.email}</ListGroup.Item>
                        {/* <ListGroup.Item type="password">Password: {shelter.user.password}</ListGroup.Item> */}
                        <ListGroup.Item>Bio: {userInfo.profile.shelter.bio}</ListGroup.Item>
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
                            {isCustomer() ? <EditCustomerProfileForm userInfo={userInfo} setUserInfo={setUserInfo} handleCloseEdit={handleCloseEdit}/> : <EditShelterProfileForm userInfo={userInfo} setUserInfo={setUserInfo} handleCloseEdit={handleCloseEdit}/>}
                        </Modal.Body>
                    </Modal>
                </Container>
                <Container>
                    <Button variant="outline-dark" onClick={handleShowDelete}>
                        Delete Account
                    </Button>

                    <Modal aria-labelledby="contained-modal-title-vcenter"
                        centered show={showDelete} onHide={handleCloseDelete} animation={false}>
                        <Modal.Body>
                            <Modal.Header closeButton style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Modal.Title className="are-you-sure">Are You Sure?</Modal.Title>
                            </Modal.Header>
                            <Stack>
                                <Button variant="outline-dark" onClick={() => handleDeleteProfile()}>
                                    Confirm
                                </Button>
                            </Stack>
                        </Modal.Body>
                    </Modal>
                </Container>
            </Stack>

        </Container>
    )
}

export default Profile