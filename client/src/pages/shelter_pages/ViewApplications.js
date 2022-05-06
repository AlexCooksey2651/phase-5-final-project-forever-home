import React, { useEffect, useState } from 'react'
import ShelterApplicationCard from "../../components/shelter_components/ShelterApplicationCard"
import { Container, Accordion } from 'react-bootstrap'

// const exampleApplications = [{
//     id: 1,
//     pet: {
//         id: 1,
//         name: "Sparky",
//         image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//         bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//         age: 2,
//         ageUnit: "years",
//         species: "Dog",
//         status: "Adoption Pending",
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
//     customer_text: "I'll be a great pug dad!"
// }]



function ViewApplications({ user }) {
    const [shelterApplications, setShelterApplications] = useState([])

    useEffect(() => {
        fetch('/shelter-applications').then((r) => {
            if (r.ok) {
                r.json().then(applications => setShelterApplications(applications))
            }
        })
    }, [])

    function handleUpdateApplication(updatedApplication) {
        const updatedApplications = shelterApplications.map(application => {
            if (application.id === updatedApplication.id) {
                return updatedApplication
            } else {
                return application
            }
        })
        setShelterApplications(updatedApplications)
    }

    const pendingApplicationCards = () => {
        const pendingApplications = shelterApplications.filter(application => application.status === "Pending")
        const cards = pendingApplications.map(application => {
            return <ShelterApplicationCard key={application.id} application={application} user={user} active={true} handleUpdateApplication={handleUpdateApplication} />
        })
        if (cards.length > 0) {
            return cards
        } else {
            return (
                <>
                    <h2><em>There are no pending applications at the moment!</em></h2>
                    <p>Make sure all of your animals' information is up to date, or consider reaching out to previous applicants!</p>
                </>
            )
        }
    }

    const deniedApplicationCards = () => {
        const deniedApplications = shelterApplications.filter(application => application.status === "We're sorry, but your application has been denied")
        const cards = deniedApplications.map(application => <ShelterApplicationCard key={application.id} application={application} user={user} active={false} handleUpdateApplication={handleUpdateApplication} />)
        if (cards.length > 0) {
            return cards
        } else {
            return <h2>No applications have been denied</h2>
        }
    }

    // const shelterApplicationCards = () => {
    //     if (shelterApplications.length > 0) {
    //         return shelterApplications.map(application => <ShelterApplicationCard key={application.id} application={application} user={user} active={true} handleUpdateApplication={handleUpdateApplication} />)
    //     } else {
    //         return (
    //             <>
    //                 <h2><em>There are no pending applications at the moment!</em></h2>
    //                 <p>Make sure all of your animals' information is up to date, or consider reaching out to previous applicants!</p>
    //             </>
    //         )
    //     }
    // }

    return (
        <Container id="active-applications">
            <br/>
            <Accordion>
                <Accordion.Item eventKey={0} className="pending-applications">
                    <Accordion.Header><h2>Pending Applications</h2></Accordion.Header>
                    <Accordion.Body>{pendingApplicationCards()}</Accordion.Body>
                </Accordion.Item>
                <br />
                <Accordion.Item eventKey={1} className="pending-applications">
                    <Accordion.Header><h2>Denied Applications</h2></Accordion.Header>
                    <Accordion.Body>{deniedApplicationCards()}</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default ViewApplications

