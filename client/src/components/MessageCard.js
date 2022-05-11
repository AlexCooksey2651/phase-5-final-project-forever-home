import React, { useState } from 'react'
import { Container, Card, Modal, Button } from 'react-bootstrap'
import ContactForm from './ContactForm'

function MessageCard({ message, user }) {
    const isCustomer = () => {
        if (user.profile.type === "customer") {
            return true
        } else if (user.profile.type === "shelter") {
            return false
        }
    }

    function cleanupDate(date) {
        const year = date.substr(0, 4)
        const month = date.substr(5, 2)
        const day = date.substr(8, 2)
        return `${month}/${day}/${year}`
    }

    const [showContact, setShowContact] = useState(false)
    const showContactForm = () => setShowContact(true)
    const closeContactForm = () => setShowContact(false)

    return (
        <Card className="message-card">
            <br />
            <h5>From: {isCustomer() ? message.shelter.name : `${message.customer.first_name} ${message.customer.last_name}`}</h5>
            <h5>Date: {cleanupDate(message.created_at)}</h5>
            <h5>Regarding: {message.pet_name}</h5>
            <p><b>Message:</b> <em>{message.message_text}</em></p>
            <Container>
                <Button variant="outline-dark" onClick={showContactForm}>
                    Reply
                </Button>
                <Modal show={showContact} onHide={closeContactForm} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Contact Shelter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ContactForm sender={user} recipient={isCustomer() ? message.shelter : message.customer} petName={message.pet_name} closeContactForm={closeContactForm}/>
                    </Modal.Body>
                </Modal>
            </Container>
            <br/>
        </Card>
    )

}
export default MessageCard