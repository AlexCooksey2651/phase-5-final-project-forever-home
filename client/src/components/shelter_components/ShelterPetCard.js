import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'


const examplePet = {
    name: "Sparky",
    picture: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
    bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
    age: 2,
    species: "Dog",
    status: "Available"
}

const ShelterPetCard = () => {
    return (
        <Container>
            <Card className="application-card" bg="light">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="pet-card-image"  src={examplePet.picture} />
                    </div>
                    <div class="col-md-8">
                        <Card.Body>
                            <Card.Title><h2>{examplePet.name}</h2></Card.Title>
                            <Card.Text>Species: {examplePet.species}</Card.Text>
                            <Card.Text>Age: {examplePet.age} years old</Card.Text>
                            
                            <Card.Text>
                                <b>Pet Bio:</b>
                                <br />
                                {examplePet.bio}
                            </Card.Text>
                            <Card.Text>Adoption Status: {examplePet.status}</Card.Text>
                            <Stack gap={2} className="col-md-5 mx-auto">
                                <Button variant="outline-dark">Edit</Button>
                                <Button variant="outline-dark">Remove Listing</Button>
                            </Stack>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default ShelterPetCard

// NOTES
// VIEW ANIMAL DATA, ASSOCIATED APPLICATIONS (+ number), REMOVE LISTING, EDIT LISTING (edit status as separate button?)
