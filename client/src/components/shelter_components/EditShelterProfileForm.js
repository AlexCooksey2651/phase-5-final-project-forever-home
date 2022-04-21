import React, { useState, useContext } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { Form, Container, Button, Alert } from 'react-bootstrap'

const stateAbbreviations = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
const stateOptions = stateAbbreviations.map(state => {
    return <option key={state} value={state}>{state}</option>
})

function EditShelterProfileForm({ user }) {
    const [userInfo, setUserInfo] = useState(user)
    const [errors, setErrors] = useState([])
    const [shelterName, setShelterName] = useState(userInfo.profile.shelter.name)
    const [city, setCity] = useState(userInfo.city)
    const [state, setState] = useState(userInfo.state)
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState(userInfo.password)
    const [bio, setBio] = useState(userInfo.profile.shelter.bio)

    function submitPatchShelter(e) {
        e.preventDefault()
        fetch(`/shelters/${user.profile.shelter.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: shelterName,
                bio,
                email,
                city,
                state,
                phone_number: phoneNumber
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then(user => setUserInfo(user))
                } else {
                    r.json().then(data => setErrors(data.errors))
                }
            })
    }

    return (
        <Form id="edit-profile-information" onSubmit={submitPatchShelter}>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Shelter Name:</b></Form.Label>
                <Form.Control type="text" placeholder="Shelter Name" value={shelterName} onChange={e => setShelterName(e.target.value)} />
            </Form.Group>


            <Form.Group>
                <Form.Label><b>Shelter Location:</b></Form.Label>
                <Form.Control type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                <Form.Select aria-label="Default select example" value={state} onChange={e => setState(e.target.value)}>
                    <option value="" disabled>State</option>
                    {stateOptions}
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Phone Number:</b></Form.Label>
                <PhoneInput country="US" placeholder="Phone Number" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Email Address:</b></Form.Label>
                <Form.Control type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Reset Password:</b></Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label><b>Shelter Bio:</b></Form.Label>
                <Form.Control as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
            </Form.Group>


            <Container>
                <br />
                <Button variant="outline-dark" type="submit">
                    Confirm Updates
                </Button>
            </Container>

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
    )
}

export default EditShelterProfileForm