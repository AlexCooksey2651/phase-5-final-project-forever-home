import React, { useContext } from 'react'
import { UserContext } from '../../context/user'
import Container from 'react-bootstrap/Container'
import PetCard from '../../components/PetCard'

function PetSearch() {
    const { user } = useContext(UserContext)
    const pets = [
        {
            id: 1,
            name: "Sparky",
            image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
            bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
            age: 2,
            ageUnit: "years",
            species: "Dog",
            status: "Available",
            shelter: {
                name: "Awesome Dogs and Cats",
                bio: "We carry lots of Cats and Dogs in NYC",
                user: {
                    email: "acooksey.hp@gmail.com",
                    password: "hello",
                    city: "New York City",
                    state: "NY",
                    phone_number: "+13148829097",
                    profile_type: "shelter",
                }
            }
        }
    ]

    const petCards = pets.map(pet => {
        return <PetCard key={pet.id} pet={pet} user={user} />
    })

    return (
        <Container id="pet-search">
            <h2>Find Your New Best Friend!</h2>
            {petCards}
        </Container>
    )
}

export default PetSearch