import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Stack from 'react-bootstrap/Stack'


const exampleApplication = {
    pet: {
        name: "Sparky",
        picture: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
        bio: "sparky is a 2-year old pug. he weighs 19lbs. he loves cuddles and sleeps a lot, but is feisty if you take him on walks. he'll make you very happy!",
        age: 2,
        species: "dog",
        status: "available"
    },
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
    date: "March 22, 2022",
    customer_text: "I'll be a great pug dad!"
}

const ShelterApplicationCard = () => {

    return (
        <Container>
            <Card className="application-card">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="application-card-image" src={exampleApplication.pet.picture} />
                    </div>
                    <div class="col-md-8">
                        <Card.Body>
                            <Card.Title>{exampleApplication.pet.name}</Card.Title>
                            <Card.Text>Application Date: {exampleApplication.date}</Card.Text>
                            <Card.Text>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Customer: {exampleApplication.customer.first_name} {exampleApplication.customer.last_name} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {exampleApplication.customer.user.email}</p>
                                            <p>Phone Number: {exampleApplication.customer.user.phone_number}</p>
                                            <Button variant="outline-dark">Contact Customer</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                            <Card.Text>
                                Application:
                                <br />
                                <em>{exampleApplication.customer_text}</em>
                            </Card.Text>
                            <Stack gap={2} className="col-md-5 mx-auto">
                                <Button variant="outline-dark">Approve Application</Button>
                                <Button variant="outline-dark">Deny Application</Button>
                            </Stack>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default ShelterApplicationCard
