import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import PhoneInput from 'react-phone-number-input/input'
import { Form, Container, Stack, Button, Alert } from 'react-bootstrap'
import { stateOptions } from '../../Resources'

function ShelterSignupForm({ onLogin }) {
    const [shelterName, setShelterName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [bio, setBio] = useState("")
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        fetch('/signup-shelter', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: shelterName,
                bio,
                user_attributes: {
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                    city,
                    state,
                    phone_number: phoneNumber,
                }
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(user => onLogin(user))
                    navigate('/home')
                } else {
                    r.json().then(data => setErrors(data.errors))
                }
            })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label><b>Shelter Name:</b></Form.Label>
                    <Form.Control  type="text" placeholder="Enter Shelter Name" value={shelterName} onChange={e => setShelterName(e.target.value)} />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label><b>Shelter Bio:</b></Form.Label>
                    <Form.Control as="textarea" placeholder="Tell us a bit about your animal shelter" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label><b>Shelter Location:</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} />
                    <Form.Select  aria-label="Default select example" value={state} onChange={e => setState(e.target.value)}>
                        <option value="" disabled >State</option>
                        {stateOptions}
                    </Form.Select>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label><b>Phone Number:</b></Form.Label>
                    <br/>
                    <PhoneInput className="phone-input"required country="US" placeholder="Enter Telephone" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label><b>Email Address:</b></Form.Label>
                    <Form.Control type="email" placeholder="Enter Shelter Email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <br/>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><b>Password:</b></Form.Label>
                    <Form.Control  type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Form.Control  type="password" placeholder="Confirm password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
                </Form.Group>

                <Stack gap={2} className="col-md-5 mx-auto" >
                    <Button className="signup-submit" variant="light" type="submit">
                        Submit
                    </Button>
                </Stack>

                <br />
                {errors ? <Form.Group>
                    {errors.map(error => {
                        return (
                            <Alert key={error} onClose={() => setErrors([])} dismissible>
                                {error}
                            </Alert>
                        )
                    })}
                </Form.Group> : null}
            </Form>
        </Container>
    )
}

export default ShelterSignupForm;