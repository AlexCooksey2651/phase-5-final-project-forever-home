import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


const NewPetForm = () => {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [species, setSpecies] = useState("")
    const [bio, setBio] = useState("")
    
    return (
        <Form id="new-pet-form">
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label><b>Pet Bio:</b></Form.Label>
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

export default NewPetForm