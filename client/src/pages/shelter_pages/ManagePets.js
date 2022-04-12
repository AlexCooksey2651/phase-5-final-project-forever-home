import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import NewPetForm from '../../components/shelter_components/NewPetForm'
import ShelterPetCard from '../../components/shelter_components/ShelterPetCard'

const ManagePets = () => {
    const [showModal, setShowModal] = useState(false)


    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    return (
        <>
            <h2>Manage Pets</h2>
            <Container>
                <Button variant="primary" onClick={handleShow}>
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
            {/* <Container>
                Dropdowns to filter by species, filter by adoption status
            </Container> */}
            <Container id="shelter-pet-card-container">
                <ShelterPetCard />
            </Container>
        </>
    )
}

export default ManagePets

// RENDERS ANIMAL CARDS
// BUTTON THAT BRINGS UP MODAL WITH ADD NEW PET FORM
// FILTER BY SPECIES
// FILTER BY ADOPTION STATUS (Available, Application Pending)