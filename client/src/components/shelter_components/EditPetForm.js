import React, { useState } from 'react'
import { Form, Container, Button, Alert } from 'react-bootstrap'


function EditPetForm({ pet, handleUpdatePet }) {
    const [name, setName] = useState(pet.name)
    const [image, setImage] = useState(pet.image)
    const [species, setSpecies] = useState(pet.species)
    const [bio, setBio] = useState(pet.bio)
    const [age, setAge] = useState(pet.age)
    const [ageUnit, setAgeUnit] = useState(pet.ageUnit)
    const [adoptionStatus, setAdoptionStatus] = useState(pet.adoption_status)
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/pets/${pet.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                image,
                species,
                bio,
                age,
                age_unit: ageUnit,
                adoption_status: adoptionStatus
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(pet => handleUpdatePet(pet))
                }
                else {
                    r.json().then(data => setErrors(data.errors))
                }
            })
    }

    return (
        <Form className="edit-pet-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Pet's Name:</b></Form.Label>
                <Form.Control type="text" placeholder="Enter Pet's Name" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Pet Image URL:</b></Form.Label>
                <Form.Control type="text" placeholder="Enter Pet Image URL" value={image} onChange={e => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label><b>Age</b></Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter Pet Age" value={age} onChange={e => setAge(e.target.value)} />
                <Form.Select aria-label="Default select example" value={ageUnit} onChange={e => setAgeUnit(e.target.value)}>
                    <option value="" disabled selected>Select</option>
                    <option value="weeks" >Weeks</option>
                    <option value="months" >Months</option>
                    <option value="years" >Years</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label><b>Pet Bio:</b></Form.Label>
                <Form.Control as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label><b>Set Adoption Status:</b></Form.Label>
                <Form.Select aria-label="Default select example" value={adoptionStatus} onChange={e => setAdoptionStatus(e.target.value)}>
                    <option value="" disabled selected>Adoption Status</option>
                    <option value="Available">Available</option>
                    <option value="Application Pending">Application(s) Pending</option>
                    <option value="Adopted">Adopted</option>
                </Form.Select>
            </Form.Group>

            <Container>
                <Button variant="dark" type="submit">
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

export default EditPetForm