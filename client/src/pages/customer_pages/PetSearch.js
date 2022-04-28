import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'
import { Container, Form } from 'react-bootstrap'
import PetCard from '../../components/PetCard'

// const pets = [
//     {
//         id: 1,
//         name: "Sparky",
//         image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//         bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//         age: 2,
//         ageUnit: "years",
//         species: "Dog",
//         status: "Available",
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
//     }
// ]

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