import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Container, Button, Alert } from 'react-bootstrap'

function NewPetForm({ handleAddPet, handleClose }) {
    const [name, setName] = useState("")
    const [imageFile, setImageFile] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [species, setSpecies] = useState("")
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(0)
    const [ageUnit, setAgeUnit] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name)
        if (imageFile) {
            formData.append("image_file", imageFile, imageFile.name)
        }
        formData.append("bio", bio)
        formData.append("species", species)
        formData.append("age", age)
        formData.append("age_unit", ageUnit)
        formData.append("adoption_status", "Available")
        for (const pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1])
        }
        fetch('/pets', {
            method: "POST",
            body: formData,
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(data => {
                        console.log(data)
                        handleAddPet(data)
                        setImageUrl(data.image_url)
                    })
                    setErrors([])
                    setName("")
                    setImageFile("")
                    setSpecies("")
                    setBio("")
                    setAge("")
                    setAgeUnit("")
                    navigate('/manage-pets')
                    handleClose()
                } 
                else {
                    r.json().then(data => setErrors(data.errors));
                }
            })
    }

    return (
        <Container>
            <Form id="new-pet-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Pet's Name:</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter Pet's Name" value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label><b>Upload Pet Image:</b></Form.Label>
                    <Form.Control type="file" accepts="image/*" multiple={false} placeholder="Upload Pet Image" onChange={e => setImageFile(e.target.files[0])} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Label><b>Select Pet Type:</b></Form.Label>
                    <Form.Select aria-label="Default select example" value={species} onChange={e => setSpecies(e.target.value)}>
                        <option value="" disabled selected>Select</option>
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
                    <Form.Control maxlength="200" as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
                </Form.Group>

                <Container>
                    <Button id="add-pet-submit" variant="light" type="submit">
                        Submit
                    </Button>
                </Container>

                <br />
                {errors ? <Form.Group>
                    {errors.map(error => {
                        return (
                            <Alert key={error} onClose={() => setErrors([])} dismissible>
                                {error}
                            </Alert>
                        )
                    })}
                </Form.Group> : null}
            </Form>
            {/* {imageUrl && <img src={imageUrl}/>} */}
        </Container>
        // <Form id="new-pet-form" onSubmit={handleSubmit}>
        //     <Form.Group className="mb-3" controlId="formBasicInput">
        //         <Form.Label><b>Pet's Name:</b></Form.Label>
        //         <Form.Control type="text" placeholder="Enter Pet's Name" value={name} onChange={e => setName(e.target.value)} />
        //     </Form.Group>

        //     <Form.Group className="mb-3" controlId="formBasicInput">
        //         <Form.Label><b>Upload Pet Image:</b></Form.Label>
        //         <Form.Control type="file" accepts="image/*" multiple={false} placeholder="Upload Pet Image" onChange={e => setImageFile(e.target.files[0])} />
        //     </Form.Group>

        //     <Form.Group className="mb-3" controlId="formBasicSelect">
        //         <Form.Label><b>Select Pet Type:</b></Form.Label>
        //         <Form.Select aria-label="Default select example" value={species} onChange={e => setSpecies(e.target.value)}>
        //             <option value="" disabled selected>Select</option>
        //             <option value="Dog">Dog</option>
        //             <option value="Cat">Cat</option>
        //             <option value="Other Mammal">Other Mammal</option>
        //             <option value="Bird">Bird</option>
        //             <option value="Reptile/Amphibian">Reptile or Amphibian</option>
        //             <option value="Fish">Fish</option>
        //         </Form.Select>
        //     </Form.Group>

        //     <Form.Group className="mb-3" controlId="formBasicInput">
        //         <Form.Label><b>Age</b></Form.Label>
        //         <Form.Control type="number" min="1" max="99" placeholder="Enter Pet Age" value={age} onChange={e => setAge(e.target.value)} />
        //         <Form.Select aria-label="Default select example" value={ageUnit} onChange={e => setAgeUnit(e.target.value)}>
        //             <option value="" disabled selected>Select</option>
        //             <option value="Weeks" >Weeks</option>
        //             <option value="Months" >Months</option>
        //             <option value="Years" >Years</option>
        //         </Form.Select>
        //     </Form.Group>

        //     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        //         <Form.Label><b>Pet Bio:</b></Form.Label>
        //         <Form.Control maxlength="200" as="textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} />
        //     </Form.Group>

        //     <Container>
        //         <Button id="add-pet-submit" variant="light" type="submit">
        //             Submit
        //         </Button>
        //     </Container>

        //     <br />
        //     {errors ? <Form.Group>
        //         {errors.map(error => {
        //             return (
        //                 <Alert key={error} onClose={() => setErrors([])} dismissible>
        //                     {error}
        //                 </Alert>
        //             )
        //         })}
        //     </Form.Group> : null}
        // </Form>
    )
}

export default NewPetForm