import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { Form, Container } from 'react-bootstrap'

const stateAbbreviations = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ]
// SRC = "https://gist.github.com/bubblerun/a624de5b4fa8ff0980010054a7220977#file-array-js"
const stateOptions = stateAbbreviations.map(state => {
    return <option key={state} value={state}>{state}</option>
})


function ShelterSignupForm() {
    const [shelterName, setShelterName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [bio, setBio] = useState("")
    
    return (
        <Container>
            <Form.Group>
                <Form.Label><b>Shelter Name:</b></Form.Label>
                <Form.Control type="text" placeholder="Enter Shelter Name" value={shelterName} onChange={e => setShelterName(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Shelter Bio:</b></Form.Label>
                <Form.Control as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Shelter Location:</b></Form.Label>
                <Form.Control type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} />
                <Form.Select aria-label="Default select example" value={state} onChange={e => setState(e.target.value)}>
                    <option value="" disabled >State</option>
                    {stateOptions}
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Phone Number:</b></Form.Label>
                <PhoneInput country="US" placeholder="Enter Telephone" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Email Address:</b></Form.Label>
                <Form.Control type="email" placeholder="Enter Shelter Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><b>Password:</b></Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                <Form.Label><b>Confirm Password:</b></Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
            </Form.Group>
        </Container>
    )
}

export default ShelterSignupForm;