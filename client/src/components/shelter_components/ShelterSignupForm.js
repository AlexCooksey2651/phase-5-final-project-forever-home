import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

const stateAbbreviations = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
// SRC = "https://gist.github.com/bubblerun/a624de5b4fa8ff0980010054a7220977#file-array-js"
const ShelterSignupForm = () => {
    const [shelterName, setShelterName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [bio, setBio] = useState("")

    const stateOptions = stateAbbreviations.map(state => {
        return <option key={state} value={state}>{state}</option>
    })
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
                {/* <Form.Control type="tel" placeholder="Enter Telephone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} /> */}
                <PhoneInput country="US" placeholder="Enter Telephone Number" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
                {/* <Form.Control type="text" placeholder="Enter Phone Number">
                    <PhoneInput country="US" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></PhoneInput>
                </Form.Control> */}
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