import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { Form, Container, Button } from 'react-bootstrap'

const stateAbbreviations = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
const stateOptions = stateAbbreviations.map(state => {
    return <option key={state} value={state}>{state}</option>
})
const allPets = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]

function EditProfileForm({ user }) {
    const [shelterName, setShelterName] = useState(user.profile.name)
    const [firstName, setFirstName] = useState(user.profile.first_name)
    const [lastName, setLastName] = useState(user.profile.last_name)
    const [city, setCity] = useState(user.city)
    const [state, setState] = useState(user.state)
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [bio, setBio] = useState(user.profile.bio)
    const [interestedIn, setInterestedIn] = useState(user.profile.interested_in)

    const isCustomer = () => {
        if (user.profile_type === "customer") {
            return true
        } else if (user.profile_type === "shelter") {
            return false
        }
    }

    function modifyWantedAnimals(animalType) {
        if (interestedIn.includes(animalType)) {
            setInterestedIn(interestedIn.filter(animal => animal !== animalType))
        } else {
            setInterestedIn([...interestedIn, animalType])
        }
    }
    
    return (
        <Form id="edit-profile-information">
            {isCustomer() ?
                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Name:</b></Form.Label>
                    <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Form.Control type="text" pladeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                </Form.Group> :
                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Shelter Name:</b></Form.Label>
                    <Form.Control type="text" placeholder="Shelter Name" value={shelterName} onChange={e => setShelterName(e.target.value)} />
                </Form.Group>
            }

            <Form.Group>
                <Form.Label><b>{isCustomer() ? "Location" : "Shelter Location"}:</b></Form.Label>
                <Form.Control type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                <Form.Select aria-label="Default select example" value={state} onChange={e => setState(e.target.value)}>
                    <option value="" disabled selected>State</option>
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

            {isCustomer() ?
                <Form.Group>
                    <Form.Label><b>What Kind(s) of Pet are you Looking For?</b></Form.Label>
                    {allPets.map(animal => {
                        return <Form.Check defaultChecked={interestedIn.includes(animal)} key={animal} label={animal} value={animal} onChange={(event) => modifyWantedAnimals(event.target.value)} />
                    })}
                </Form.Group> :
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label><b>Shelter Bio:</b></Form.Label>
                    <Form.Control as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
                </Form.Group>
            }

            <Container>
                <Button variant="outline-dark" type="submit">
                    Confirm Updates
                </Button>
            </Container>
        </Form>
    )
}

export default EditProfileForm