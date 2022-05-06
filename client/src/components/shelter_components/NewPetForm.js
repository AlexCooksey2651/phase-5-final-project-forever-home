import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Container, Button, Alert } from 'react-bootstrap'

function NewPetForm({ handleAddPet }) {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [species, setSpecies] = useState("")
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(0)
    const [ageUnit, setAgeUnit] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/pets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                image,
                bio,
                species,
                age,
                age_unit: ageUnit,
                adoption_status: "Available"
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(data => handleAddPet(data))
                    setErrors([])
                    setName("")
                    setImage("")
                    setSpecies("")
                    setBio("")
                    setAge("")
                    setAgeUnit("")
                    navigate('/manage-pets')
                } else {
                    r.json().then(data => setErrors(data.errors));
                }
            })
    }

    return (
        <Form id="new-pet-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Pet's Name:</b></Form.Label>
                <Form.Control required minlength="2" maxlength="20" type="text" placeholder="Enter Pet's Name" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Pet Image URL:</b></Form.Label>
                <Form.Control required type="text" placeholder="Enter Pet Image URL" value={image} onChange={e => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label><b>Select Pet Species:</b></Form.Label>
                <Form.Select required aria-label="Default select example" value={species} onChange={e => setSpecies(e.target.value)}>
                    <option value="" disabled selected>Pet Species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Other Mammal">Other Mammal</option>
                    <option value="Bird">Bird</option>
                    <option value="Reptile/Amphibian">Reptile or Amphibian</option>
                    <option value="Fish">Fish</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Age</b></Form.Label>
                <Form.Control type="number" min="1" max="99" placeholder="Enter Pet Age" value={age} onChange={e => setAge(e.target.value)} />
                <Form.Select aria-label="Default select example" value={ageUnit} onChange={e => setAgeUnit(e.target.value)}>
                    <option value="" disabled selected>Select</option>
                    <option value="Weeks" >Weeks</option>
                    <option value="Months" >Months</option>
                    <option value="Years" >Years</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label><b>Pet Bio:</b></Form.Label>
                <Form.Control required maxlength="200" as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
            </Form.Group>

            <Container>
                <Button variant="dark" type="submit">
                    Submit
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

export default NewPetForm