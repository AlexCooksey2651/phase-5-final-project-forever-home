import React, { useState } from 'react'
import { Button, Container, Stack, Modal } from 'react-bootstrap'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import Header from '../components/Header'
import RetrievePasswordForm from './RetrievePasswordForm'

function Login({ onLogin }) {
    const [loginPage, setLoginPage] = useState(true)

    function toggleLoginPage() {
        setLoginPage(!loginPage)
    }

    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
        <div id="login">
            <Container >
                <Header />
                {loginPage ? <LoginForm onLogin={onLogin} /> : <SignupForm onLogin={onLogin} />}
                <Stack gap={2} className="col-md-5 mx-auto">
                    {loginPage ?
                        <>
                            <Button onClick={handleShowModal} variant="outline-dark">
                                Forgot Password?
                            </Button>
                            <Modal show={showModal} onHide={handleCloseModal} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Retrieve Password:</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <RetrievePasswordForm handleCloseModal={handleCloseModal} />
                                </Modal.Body>
                            </Modal>
                        </>
                        : null}
                    <Button variant="outline-dark" onClick={toggleLoginPage}>
                        {loginPage ? "Create Account" : "Return to Login Page"}
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}

export default Login