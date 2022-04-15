import React from 'react'
import { Container, Card, Button, Accordion, Stack } from 'react-bootstrap'

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

function ShelterApplicationCard({ application }) {
    const pet = application.pet
    const customer = application.customer


    return (
        <Container>
            <Card className="application-card">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <Card.Img className="application-card-image" src={pet.image} alt="pet picture"/>
                    </div>
                    <div class="col-md-8">
                        <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Text>Application Date: {application.date}</Card.Text>
                            <Card.Text>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Customer: {`${customer.first_name} ${customer.last_name}`} </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email: {customer.user.email}</p>
                                            <p>Phone Number: {formatPhoneNum(customer.user.phone_number)}</p>
                                            <Button variant="outline-dark">Contact Customer</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                            <Card.Text>
                                Application:
                                <br />
                                <em>{application.customer_text}</em>
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
