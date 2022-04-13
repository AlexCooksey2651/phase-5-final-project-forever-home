import React from 'react'

const CustomerSignupForm = () => {
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label><b>First Name:</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" value={firstName}} onChange={e => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Last Name:</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" value={lastName}} onChange={e => setLastName(e.target.value)} />
                </Form.Group>
            </Form>
        </Container>
    )
}

export default CustomerSignupForm