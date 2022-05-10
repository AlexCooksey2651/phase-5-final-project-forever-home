import Reac, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'

function RetrievePasswordForm({ handleCloseModal }) {
    const [email, setEmail] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()
        handleCloseModal()
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label><b>Email Address:</b></Form.Label>
                <Form.Control required type="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <br/>
            <Button variant="outline-dark" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default RetrievePasswordForm