import React, { useState, useContext } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { Form, Container, Button, Alert } from 'react-bootstrap'

const stateAbbreviations = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
const stateOptions = stateAbbreviations.map(state => {
    return <option key={state} value={state}>{state}</option>
})
const allPets = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]

function EditCustomerProfileForm({ user }) {
    const [userInfo, setUserInfo] = useState(user)
    const [errors, setErrors] = useState([])

    const [firstName, setFirstName] = useState(userInfo.profile.customer.first_name)
    const [lastName, setLastName] = useState(userInfo.profile.customer.last_name)
    const [city, setCity] = useState(userInfo.city)
    const [state, setState] = useState(userInfo.state)
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number)
    const [email, setEmail] = useState(userInfo.email)
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
    const [interestedIn, setInterestedIn] = useState(userInfo.profile.customer.interested_in)

    function modifyWantedAnimals(animalType) {
        if (interestedIn.includes(animalType)) {
            setInterestedIn(interestedIn.filter(animal => animal !== animalType))
        } else {
            setInterestedIn([...interestedIn, animalType])
        }
    }

    function submitPatchCustomer(e) {
        e.preventDefault()
        fetch(`/customers/${user.profile.customer.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                interested_in: interestedIn,
                user_attributes: {
                    email,
                    password: newPassword,
                    password_confirmation: newPasswordConfirmation,
                    city,
                    state,
                    phone_number: phoneNumber
                }
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
        <Form className="edit-profile-information" onSubmit={submitPatchCustomer}>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Name:</b></Form.Label>
                <Form.Control required minlength="2" maxlength="20" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <Form.Control required minlength="2" maxlength="20" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Location:</b></Form.Label>
                <Form.Control type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                <Form.Select required aria-label="Default select example" value={state} onChange={e => setState(e.target.value)}>
                    <option value="" disabled>State</option>
                    {stateOptions}
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label><b>Phone Number:</b></Form.Label>
                <PhoneInput required country="US" placeholder="Phone Number" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Email Address:</b></Form.Label>
                <Form.Control required type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><b>Reset Password:</b></Form.Label>
                <Form.Control minlength="6" maxlength="20" type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <Form.Control minlength="6" maxlength="20" type="password" placeholder="Confirm password" value={newPasswordConfirmation} onChange={e => setNewPasswordConfirmation(e.target.value)} />
            </Form.Group>


            <Form.Group>
                <Form.Label><b>What Kind(s) of Pet are you Looking For?</b></Form.Label>
                {allPets.map(animal => {
                    return <Form.Check defaultChecked={interestedIn.includes(animal)} key={animal} label={animal} value={animal} onChange={(event) => modifyWantedAnimals(event.target.value)} />
                })}
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

export default EditCustomerProfileForm