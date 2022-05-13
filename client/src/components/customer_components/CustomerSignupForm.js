import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import PhoneInput from 'react-phone-number-input/input'
import { Form, Container, Stack, Button, Alert } from 'react-bootstrap'
import { allPets, stateOptions } from '../../Resources'

function CustomerSignupForm({ onLogin }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [interestedIn, setInterestedIn] = useState(allPets)
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()

    function modifyWantedAnimals(animalType) {
        if (interestedIn.includes(animalType)) {
            setInterestedIn(interestedIn.filter(animal => animal !== animalType))
        } else {
            setInterestedIn([...interestedIn, animalType])
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        fetch('/signup-customer', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                interested_in: interestedIn,
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
                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Name:</b></Form.Label>
                    <Form.Control required minlength="2" maxlength="20" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Form.Control required minlength="2" maxlength="20" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label><b>Location:</b></Form.Label>
                    <Form.Control required minlength="2" maxlength="20" type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} />
                    <Form.Select required aria-label="Default select example" value={state} onChange={e => setState(e.target.value)}>
                        <option value="" disabled >State</option>
                        {stateOptions}
                    </Form.Select>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label><b>Phone Number:</b></Form.Label>
                    <PhoneInput required country="US" placeholder="Enter Telephone" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label><b>What Kind(s) of Pet are you Looking For?</b></Form.Label>
                    {allPets.map(animal => {
                        return <Form.Check defaultChecked key={animal} label={animal} value={animal} onChange={(event) => modifyWantedAnimals(event.target.value)} />
                    })}
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label><b>Email Address:</b></Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <br/>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><b>Password:</b></Form.Label>
                    <Form.Control required minlength="6" maxlength="20" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Form.Control required minlength="6" maxlength="20" type="password" placeholder="Confirm password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
                </Form.Group>

                <Stack gap={2} className="col-md-5 mx-auto" >
                    <Button variant="outline-dark" type="submit">
                        Submit
                    </Button>
                </Stack>

                <br />
                {errors ? <Form.Group>
                    {errors.map(error => {
                        return (
                            <Alert key={error}>
                                {error}
                            </Alert>
                        )
                    })}
                </Form.Group> : null}
            </Form>
        </Container>
    )
}

export default CustomerSignupForm
