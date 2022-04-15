import React from 'react'
import { Container, Card, Button, Accordion } from 'react-bootstrap'

const examplePet = {
    name: "Fido",
    image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
    bio: "Fido is a 2-year old Pug. He weighs 23lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
    age: 6,
    species: "Dog",
    status: "Adopted",
    adoptionDate: "April 12, 2022",
    application: {
        customer: {
            first_name: "Alex",
            last_name: "Cooksey",
            interested_in: ["dog", "cat", "bird"],
            user: {
                email: "aecooksey2651@gmail.com",
                password: "pugsaregreat",
                phone_number: "(720) 301-8361"
            },
        },
    }
}

function PreviousAdoptionCard() {
    return (
        <Container>
            <Card className="application-card">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="application-card-image" src={examplePet.image} />
                    </div>
                    <div class="col-md-8">
                        <Card.Body>
                            <Card.Title>{examplePet.name}</Card.Title>
                            <Card.Text>Adoption Date: {examplePet.adoptionDate}</Card.Text>
                            <Card.Text>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Customer: {examplePet.application.customer.first_name} {examplePet.application.customer.last_name} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {examplePet.application.customer.user.email}</p>
                                            <p>Phone Number: {examplePet.application.customer.user.phone_number}</p>
                                            <Button variant="outline-dark">Contact Customer</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default PreviousAdoptionCard