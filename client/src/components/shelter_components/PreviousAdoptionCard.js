import React from 'react'
import { Container, Card, Button, Accordion } from 'react-bootstrap'



function PreviousAdoptionCard({ pet }) {
    return (
        <Container>
            <Card className="application-card">
                <div className="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="application-card-image" src={pet.image} />
                    </div>
                    <div class="col-md-8">
                        <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Text>Adoption Date: {pet.adoptionDate}</Card.Text>
                            <Card.Text>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Customer: {pet.application.customer.first_name} {pet.application.customer.last_name} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {pet.application.customer.user.email}</p>
                                            <p>Phone Number: {pet.application.customer.user.phone_number}</p>
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