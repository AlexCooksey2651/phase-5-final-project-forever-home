import React from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import PetCard from '../../components/PetCard'

const PetSearch = ({ user }) => {
    const pets = [{
        id: 1,
        name: "Sparky",
        image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
        bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
        age: 2,
        ageUnit: "years",
        species: "Dog",
        status: "Available"
    }]
    
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