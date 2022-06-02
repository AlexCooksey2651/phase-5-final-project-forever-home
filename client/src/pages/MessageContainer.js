import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import MessageCard from '../components/MessageCard'


function MessageContainer({ user }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        console.log('hello')
        fetch('/messages').then(r => {
            if (r.ok) {
                r.json().then(messages => setMessages(messages))
            }
        })
    }, [])

    const receivedMessageCards = () => {
        const received = messages.filter(message => message.sender !== user.profile.type)
        const cards = received.map(message => <MessageCard key={message.id} message={message} user={user}/>)
        if (cards.length > 0) {
            return cards
        } else {
            return <h2><em>You currently have no messages</em></h2>
        }
    }

    return (
        <Container id="messages">
            <br />
            <h2 className="messages-header">Received Messages</h2>
            <br />
            
            {receivedMessageCards()}
        </Container >
    )
}

export default MessageContainer