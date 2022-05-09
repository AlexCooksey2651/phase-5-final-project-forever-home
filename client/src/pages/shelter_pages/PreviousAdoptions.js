import React, { useState, useEffect } from 'react'
import PreviousAdoptionCard from '../../components/shelter_components/PreviousAdoptionCard'
import { Container } from 'react-bootstrap'

function PreviousAdoptions({ user }) {
    const [previousAdoptions, setPreviousAdoptions] = useState([])

    useEffect(() => {
        fetch('/adopted-pets').then(r => {
            if (r.ok) {
                r.json().then(pets => setPreviousAdoptions(pets))
            }
        })
    }, [])

    const previousAdoptionCards = () => {
        if (previousAdoptions.length > 0) {
            return previousAdoptions.map(pet => <PreviousAdoptionCard key={pet.id} pet={pet} user={user}/>)
        } else {
            return (
                <>
                    <h2><em>No pets have been adopted from your shelter just yet!</em></h2>
                    <p>Head over to the "Applications" page to see if anyone has applied to adopt one of your pets!</p>
                </>
            )
        }
    }

    return (
        <Container id="previous-adoptions">
            <br />
            <h2>Previous Adoptions</h2>
            <br />
            {previousAdoptionCards()}
        </Container>
    )
}

export default PreviousAdoptions