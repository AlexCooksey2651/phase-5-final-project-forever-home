import React, { useEffect, useState } from 'react'
import { Container, Accordion } from 'react-bootstrap'
import MessageCard from '../components/MessageCard'


function MessageContainer({ user }) {
    const [messages, setMessages] = useState([])
    const isCustomer = () => {
        if (user.profile.type === "customer") {
            return true
        } else if (user.profile.type === "shelter") {
            return false
        }
    }

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

    // const messageCards = () => {
    //     if (messages.length > 0) {
    //         const cards = messages.map(message => <MessageCard key={message.id} message={message} user={user}/>)
    //         return cards
    //     } else {
    //         return <h2><em>You currently have no messages</em></h2>
    //     }
    // }

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