import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const stateAbbreviations = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]

const EditProfileForm = ({ shelter }) => {
    const [shelterName, setShelterName] = useState(shelter.shelterName)
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [email, setEmail] = useState(shelter.user.email)
    const [password, setPassword] = useState(shelter.user.password)
    const [bio, setBio] = useState(shelter.bio)

    const stateOptions = stateAbbreviations.map(state => {
        return <option key={state} value={state}>{state}</option>
    })

    return (
        <Form id="edit-profile-information">
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Shelter Name:</b></Form.Label>
                <Form.Control type="text" value={shelterName} onChange={e => setShelterName(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Shelter Location:</b></Form.Label>
                <Form.Control inline type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} />
                <Form.Select inline aria-label="Default select example" value={state} onChange={e => setState(e.target.value)}>
                    <option value="" disabled selected>State</option>
                    {stateOptions}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Email Address:</b></Form.Label>
                <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Reset Password:</b></Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label><b>Select Pet Species:</b></Form.Label>
                <Form.Select aria-label="Default select example" value={species} onChange={e => setSpecies(e.target.value)}>
                    <option value="" disabled selected>Pet Species</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other mammal">Other Mammal</option>
                    <option value="bird">Bird</option>
                    <option value="reptile/amphibian">Reptile or Amphibian</option>
                    <option value="fish">Fish</option>
                </Form.Select>
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label><b>Shelter Bio:</b></Form.Label>
                <Form.Control as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
            </Form.Group>

            <Container>
                <Button variant="light" type="submit">
                    Submit
                </Button>
            </Container>
        </Form>
    )
}

export default EditProfileForm