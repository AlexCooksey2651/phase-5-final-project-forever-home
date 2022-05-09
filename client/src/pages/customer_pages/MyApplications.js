import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/user'
import CustomerApplicationCard from '../../components/customer_components/CustomerApplicationCard'
import { Container, Accordion } from 'react-bootstrap'

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
                <Accordion.Item eventKey={2} className="denied-applications">
                    <Accordion.Header><h2>Denied Applications</h2></Accordion.Header>
                    <Accordion.Body>{deniedApplicationCards()}</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default MyApplications