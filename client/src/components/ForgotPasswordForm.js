// import React, { useState } from 'react'
// import { Form, Button } from 'react-bootstrap'

// function ForgotPasswordForm({ handleCloseModal }) {
//     const [email, setEmail] = useState("")
//     const [errors, setErrors] = useState([])
    
//     function handleSubmit(e) {
//         e.preventDefault()
//         setErrors([])
//         fetch('/password/forgot', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email
//             })
//         })
//             .then(r => {
//                 if (r.ok) {
//                     r.json().then(data => setErrors(data.alert))
//                 } else {
//                     r.json().then(data => setErrors(data.errors))
//                 }
//             })
//         handleCloseModal()
//     }
    
//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group>
//                 <Form.Label><b>Email Address:</b></Form.Label>
//                 <Form.Control required type="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.target.value)} />
//             </Form.Group>
//             <br/>
//             <Button variant="outline-dark" type="submit">
//                 Submit
//             </Button>
//         </Form>
//     )
// }

// export default ForgotPasswordForm