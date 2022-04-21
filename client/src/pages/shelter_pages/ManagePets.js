import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import { Container, Modal, Button, Form } from 'react-bootstrap'
import NewPetForm from '../../components/shelter_components/NewPetForm'
import PetCard from '../../components/PetCard'

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

function ManagePets({ user }) {
    // const { user } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)
    const [pets, setPets] = useState([])
    const [searchText, setSearchText] = useState("")

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    useEffect(() => {
        fetch('/shelter-pets').then(r => {
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

    const petCards = () => {
        if (searchedPets().length > 0) {
            return searchedPets().map(pet => <PetCard key={pet.id} pet={pet} user={user} handleUpdatePet={handleUpdatePet} handleDeletePet={handleDeletePet}/>)
        } else {
            return (
                <>
                    <h2><em>Currently, the Shelter has no pets up for adoption.</em></h2>
                    <p>Use the "Add Pet" form above to add information for new pets at your shelter.</p>
                </>
            )
        }
    }

    return (
        <Container id="manage-pets">
            <br/>
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
            <div className="pet-search-bar">
                <Form>
                    <Form.Group >
                        <Form.Label for="pet-search">Search for a Pet:</Form.Label>
                        <Form.Control type="text" placeholder="Search" onChange={(event) => setSearchText(event.target.value)} />
                    </Form.Group>
                </Form>
            </div>
            <br />
            <Container id="shelter-pet-card-container">
                {petCards()}
            </Container>
        </Container>
    )
}

export default ManagePets