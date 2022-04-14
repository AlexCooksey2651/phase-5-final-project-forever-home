import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

const allPets = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"] 
const stateAbbreviations = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ]
const stateOptions = stateAbbreviations.map(state => {
    return <option key={state} value={state}>{state}</option>
})

const CustomerSignupForm = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [interestedIn, setInterestedIn] = useState(allPets)

    function modifyWantedAnimals(animalType) {
        if (interestedIn.includes(animalType)) {
            setInterestedIn(interestedIn.filter(animal => animal !== animalType))
        } else {
            setInterestedIn([...interestedIn, animalType])
        }
    }

    return (
        <Container>
            <Form.Group>
                <Form.Label><b>First Name:</b></Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label><b>Last Name:</b></Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Location:</b></Form.Label>
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
                <Form.Label><b>What Kind(s) of Pet are you Looking For?</b></Form.Label>
                {allPets.map(animal => {
                    return <Form.Check defaultChecked key={animal} label={animal} value={animal} onChange={(event) => modifyWantedAnimals(event.target.value)}/>
                })}
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Email Address:</b></Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
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

export default CustomerSignupForm