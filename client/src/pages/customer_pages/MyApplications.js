import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/user'
import CustomerApplicationCard from '../../components/customer_components/CustomerApplicationCard'
import { Container, Accordion } from 'react-bootstrap'

// const applications = [{
//     id: 1,
//     pet: {
//         id: 1,
//         name: "Sparky",
//         image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//         bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//         age: 2,
//         ageUnit: "years",
//         species: "Dog",
//         adoption_status: "Application(s) Pending",
//         adoption_date: "April 12, 2022",
//         shelter: {
//             name: "Awesome Dogs and Cats",
//             bio: "We carry lots of Cats and Dogs in NYC",
//             user: {
//                 email: "acooksey.hp@gmail.com",
//                 password: "hello",
//                 city: "New York City",
//                 state: "NY",
//                 phone_number: "+13148829097",
//                 profile_type: "shelter",
//             }
//         }
//     },
//     customer: {
//         first_name: "Alex",
//         last_name: "Cooksey",
//         interested_in: ["Dog", "Cat", "Bird"],
//         user: {
//             email: "aecooksey2651@gmail.com",
//             password: "hello",
//             city: "Jersey City",
//             state: "NJ",
//             phone_number: "+17203018361",
//             profile_type: "customer",
//         },
//     },
//     date: "March 22, 2022",
//     customer_text: "I'll be a great pug dad!",
//     status: "We're sorry, but your application has been denied"
// }]

function MyApplications({ user }) {
    // const { user } = useContext(UserContext)
    const [customerApplications, setCustomerApplications] = useState([])

    useEffect(() => {
        fetch('/customer-applications').then(r => {
            if (r.ok) {
                r.json().then(applications => setCustomerApplications(applications))
            }
        })
    }, [])

    function handleRemoveApplication(deletedApplication) {
        const updatedCustomerApplications = customerApplications.filter(application => application.id !== deletedApplication.id)
        setCustomerApplications(updatedCustomerApplications)
    }
    const approvedApplicationCards = () => {
        const approvedApplications = customerApplications.filter(application => application.status === "Approved")
        const cards = approvedApplications.map(application => {
            return <CustomerApplicationCard key={application.id} application={application} user={user} withdraw={false} />
        })
        if (cards.length > 0) {
            return cards
        } else {
            return <h2>You haven't adopted any pets.</h2>
        }
    }

    const pendingApplicationCards = () => {
        const pendingApplications = customerApplications.filter(application => application.status === "Pending")
        const cards = pendingApplications.map(application => {
            return <CustomerApplicationCard key={application.id} application={application} user={user} withdraw={true} handleRemoveApplication={handleRemoveApplication} />
        })
        if (cards.length > 0) {
            return cards
        } else {
            return <h2>You don't have any pending applications.</h2>
        }
    }

    const deniedApplicationCards = () => {
        const deniedApplications = customerApplications.filter(application => application.status === "We're sorry, but your application has been denied")
        const cards = deniedApplications.map(application => {
            return <CustomerApplicationCard key={application.id} application={application} user={user} withdraw={false} />
        })
        if (cards.length > 0) {
            return cards
        } else {
            return <h2>You haven't had any applications denied.</h2>
        }
    }


    return (
        <Container id="customer-applications-container">
            <br/>
            <Accordion>
                <Accordion.Item eventKey={0} className="approved-applications">
                    <Accordion.Header><h2>Approved Applications! Come Meet Your New Best Friend!</h2></Accordion.Header>
                    <Accordion.Body>
                        {approvedApplicationCards()}
                    </Accordion.Body>
                </Accordion.Item>
                <br />
                <Accordion.Item eventKey={1} className="pending-applications">
                    <Accordion.Header><h2>Pending Applications</h2></Accordion.Header>
                    <Accordion.Body>{pendingApplicationCards()}</Accordion.Body>
                </Accordion.Item>
                <br />
                <Accordion.Item eventKey={2} className="pending-applications">
                    <Accordion.Header><h2>Denied Applications</h2></Accordion.Header>
                    <Accordion.Body>{deniedApplicationCards()}</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default MyApplications