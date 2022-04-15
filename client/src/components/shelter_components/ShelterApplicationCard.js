import React from 'react'
import { Container, Card, Button, Accordion, Stack } from 'react-bootstrap'

const exampleApplication = {
    pet: {
        id: 1,
        name: "Sparky",
        image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
        bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
        age: 2,
        ageUnit: "years",
        species: "Dog",
        status: "Adoption Pending"
    },
    customer: {
        first_name: "Alex",
        last_name: "Cooksey",
        interested_in: ["Dog", "Cat", "Bird"],
        user: {
            email: "aecooksey2651@gmail.com",
            password: "hello",
            city: "Jersey City", 
            state: "NJ",
            phone_number: "+17203018361",
            profile_type: "customer",
        },
    },
    date: "March 22, 2022",
    customer_text: "I'll be a great pug dad!"
}

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

function ShelterApplicationCard() {
    const pet = exampleApplication.pet
    const customer = exampleApplication.customer


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
                            <Card.Text>Application Date: {exampleApplication.date}</Card.Text>
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
