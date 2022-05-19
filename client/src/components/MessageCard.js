import React, { useState } from 'react'
import { Container, Card, Modal, Button } from 'react-bootstrap'
import ContactForm from './ContactForm'
import { cleanupDate, isCustomer } from '../Resources'

function MessageCard({ message, user }) {
    const [showContact, setShowContact] = useState(false)
    const showContactForm = () => setShowContact(true)
    const closeContactForm = () => setShowContact(false)

    return (
        <Card className="message-card">
            <br />
            <h5>From: {isCustomer(user) ? message.shelter.name : `${message.customer.first_name} ${message.customer.last_name}`}</h5>
            <h5>Date: {cleanupDate(message.created_at)}</h5>
            <h5>Regarding: {message.pet_name}</h5>
            <br/>
            <p><b>Message:</b> <br/><em>{message.message_text}</em></p>
            <Container>
                <Button className="reply-btn" variant="outline-dark" onClick={showContactForm}>
                    Reply
                </Button>
                <Modal show={showContact} onHide={closeContactForm} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Contact Shelter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ContactForm sender={user} recipient={isCustomer(user) ? message.shelter : message.customer} petName={message.pet_name} closeContactForm={closeContactForm}/>
                    </Modal.Body>
                </Modal>
            </Container>
            <br/>
        </Card>
    )

}
export default MessageCard