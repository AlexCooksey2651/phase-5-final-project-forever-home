import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'
import { Container, Form } from 'react-bootstrap'
import PetCard from '../../components/PetCard'

function PetSearch({ user }) {
    // const { user } = useContext(UserContext)
    const [pets, setPets] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        fetch('/customer-pets').then(r => {
            if (r.ok) {
                r.json().then(pets => setPets(pets))
            }
        })
    }, [])

    const searchedPets = () => {
        if (pets.length > 0) {
            return pets.filter(pet => (pet.name.toLowerCase().includes(searchText.toLowerCase()) || pet.bio.toLowerCase().includes(searchText.toLowerCase())))
        }
        else {
            return []
        }
    }

    const petCards = () => {
        if (searchedPets().length > 0) {
            return searchedPets().map(pet => <PetCard key={pet.id} pet={pet} user={user} />)
        } else {
            return (
                <>
                    <h2><em>No animals match your search</em></h2>
                    <p>Try altering your search above, or consider revising your preferences in the account page.</p>
                </>

            )
        }
    }

    return (
        <Container id="pet-search">
            <br />
            <h2>Find Your New Best Friend!</h2>
            <br />
            <div className="pet-search-bar">
                <Form>
                    <Form.Group >
                        <Form.Label for="pet-search">Search for a Pet:</Form.Label>
                        <Form.Control type="text" placeholder="Search" onChange={(event) => setSearchText(event.target.value)} />
                    </Form.Group>
                </Form>
            </div>
            <br />
            {petCards()}
        </Container>
    )
}

export default PetSearch