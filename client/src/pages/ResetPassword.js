// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom"
// import { Form, Container, Button } from 'react-bootstrap'

// function ResetPassword({ onLogin }) {
//     const [email, setEmail] = useState("")
//     const [temporaryPassword, setTemporaryPassword] = useState("")
//     const [newPassword, setNewPassword] = useState("")
//     const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
//     const [errors, setErrors] = useState([])
//     const navigate = useNavigate()

//     function handleSubmit(e) {
//         e.preventDefault()
//         setErrors([])
//         fetch('/password/reset', {
//             method: "PATCH", 
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email, 
//                 reset_password: temporaryPassword,
//                 password: newPassword,
//                 password_confirmation: newPasswordConfirmation
//             })
//         })
//         .then(r => {
//             if (r.ok) {
//                 r.json().then(user => {
//                     onLogin(user)
//                     navigate('/home')
//                 })
//             } else {
//                 r.json().then(data => setErrors(data.errors))
//             }
//         })
//     }

//     return (
//         <Container>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group>
//                     <Form.Label><b>Email Address:</b></Form.Label>
//                     <Form.Control required type="email" placeholder="Enter Shelter Email" value={email} onChange={e => setEmail(e.target.value)} />
//                 </Form.Group>
//                 <br />
//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label><b>Temporary Password:</b></Form.Label>
//                     <Form.Control type="password" placeholder="Password" value={temporaryPassword} onChange={e => setTemporaryPassword(e.target.value)} />
//                 </Form.Group>
//                 <br />
//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label><b>New Password:</b></Form.Label>
//                     <Form.Control minLength="6" maxLength="20" type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
//                     <Form.Control minLength="6" maxLength="20" type="password" placeholder="Confirm password" value={newPasswordConfirmation} onChange={e => setNewPasswordConfirmation(e.target.value)} />
//                 </Form.Group>

//                 <Stack gap={2} className="col-md-5 mx-auto" >
//                     <Button variant="outline-dark" type="submit">
//                         Submit
//                     </Button>
//                 </Stack>

//                 <br />
//                 {errors ? <Form.Group>
//                     {errors.map(error => {
//                         return (
//                             <Alert key={error}>
//                                 {error}
//                             </Alert>
//                         )
//                     })}
//                 </Form.Group> : null}
//             </Form>
//         </Container>
//     )
// }

// export default ResetPassword