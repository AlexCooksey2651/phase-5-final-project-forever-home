import React, { useEffect, useState } from 'react'
import ShelterApplicationCard from "../../components/shelter_components/ShelterApplicationCard"
import { Container, Accordion } from 'react-bootstrap'

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

