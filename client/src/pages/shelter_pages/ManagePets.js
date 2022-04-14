import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import NewPetForm from '../../components/shelter_components/NewPetForm'
import PetCard from '../../components/PetCard'

const ManagePets = ({ user }) => {
    const [showModal, setShowModal] = useState(false)


    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

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
        <div id="manage-pets">
            <h2>Manage Pets</h2>
            <br/>
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
            <br/>
            {/* <Container>
                Dropdowns to filter by species, filter by adoption status
            </Container> */}
            <Container id="shelter-pet-card-container">
                {petCards}
            </Container>
        </div>
    )
}

export default ManagePets

// RENDERS ANIMAL CARDS
// BUTTON THAT BRINGS UP MODAL WITH ADD NEW PET FORM
// FILTER BY SPECIES
// FILTER BY ADOPTION STATUS (Available, Application Pending)