import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/user'
import { Container, Modal, Button } from 'react-bootstrap'
import NewPetForm from '../../components/shelter_components/NewPetForm'
import PetCard from '../../components/PetCard'
import { useEffect } from 'react/cjs/react.production.min'

// const pets = [{
//     id: 1,
//     name: "Sparky",
//     image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//     bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//     age: 2,
//     ageUnit: "years",
//     species: "Dog",
//     status: "Available"
// }]

function ManagePets() {
    const { user } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)
    const [pets, setPets] = useState([])

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    useEffect(() => {
        fetch('/shelter-pets').then(r => {
            if (r.ok) {
                r.json().then(pets => setPets(pets))
            }
        })
    }, [])

    function handleUpdatePet(updatedPet) {
        const updatedPets = pets.filter(pet => {
            if (pet.id === updatedPet.id) {
                return updatedPet
            } else {
                return pet
            }
        })
        setPets(updatedPets)
    }

    function handleDeletePet(deletedPet) {
        const updatedPets = pets.filter(pet => pet.id !== deletedPet.id)
        setPets(updatedPets)
    }

    const petCards = pets.map(pet => {
        return <PetCard 
            key={pet.id} 
            pet={pet} 
            user={user} 
            handleUpdatePet={handleUpdatePet}
            handleDeletePet={handleDeletePet}
            />
    })

    return (
        <div id="manage-pets">
            <h2>Manage Pets</h2>
            <br />
            <Container>
                <Button variant="outline-dark" onClick={handleShow}>
                    Add New Pet
                </Button>
                <Modal show={showModal} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a New Pet to your Shelter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewPetForm />
                    </Modal.Body>
                </Modal>
            </Container>
            <br />
            <Container id="shelter-pet-card-container">
                {petCards}
            </Container>
        </div>
    )
}

export default ManagePets