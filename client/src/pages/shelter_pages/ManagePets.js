import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import { Container, Modal, Button, Form, Row, Col, Dropdown } from 'react-bootstrap'
import NewPetForm from '../../components/shelter_components/NewPetForm'
import PetCard from '../../components/PetCard'
import { allPets } from '../../Resources'

function ManagePets({ user }) {
    // const { user } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)
    const [pets, setPets] = useState([])
    const [searchText, setSearchText] = useState("")
    const [interestedIn, setInterestedIn] = useState(allPets)
    const [lowerAge, setLowerAge] = useState(0)
    const [upperAge, setUpperAge] = useState(99)

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    useEffect(() => {
        fetch('/shelter-pets').then(r => {
            if (r.ok) {
                r.json().then(pets => setPets(pets))
            }
        })
    }, [])

    // const searchedPets = () => {
    //     if (pets.length > 0) {
    //         return pets.filter(pet => (pet.name.toLowerCase().includes(searchText.toLowerCase()) || pet.bio.toLowerCase().includes(searchText.toLowerCase())))
    //     }
    //     else {
    //         return []
    //     }
    // }

    function modifyWantedAnimals(animalType) {
        if (interestedIn.includes(animalType)) {
            setInterestedIn(interestedIn.filter(animal => animal !== animalType))
        } else {
            setInterestedIn([...interestedIn, animalType])
        }
    }

    const filteredBySpecies = () => {
        if (pets.length > 0) {
            const filtered = pets.filter(pet => interestedIn.includes(pet.species))
            return filtered
        } else {
            return []
        }
    }

    const ageInYears = (pet) => {
        if (pet.age_unit === "Weeks" || pet.age_unit === "Months") {
            return 0
        } else {
            return pet.age
        }
    }

    const searchedPets = () => {
        if (filteredByAge().length > 0) {
            return filteredByAge().filter(pet => (pet.name.toLowerCase().includes(searchText.toLowerCase()) || pet.bio.toLowerCase().includes(searchText.toLowerCase()) || pet.species.toLowerCase().includes(searchText.toLowerCase())))
        }
        else {
            return []
        }
    }

    const filteredByAge = () => {
        if (filteredBySpecies().length > 0) {
            return filteredBySpecies().filter(pet => (ageInYears(pet) >= lowerAge && ageInYears(pet) <= upperAge))
        } else {
            return []
        }
    }

    function handleAddPet(newPet) {
        setPets([...pets, newPet])
    }

    function handleUpdatePet(updatedPet) {
        const updatedPets = pets.map(pet => {
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
            return searchedPets().map(pet => <PetCard className="pet-card" key={pet.id} pet={pet} user={user} handleUpdatePet={handleUpdatePet} handleDeletePet={handleDeletePet} />)
        } else {
            return (
                <>
                    <h2><em>Your shelter has no adoption listings that match this search.</em></h2>
                    <p>Please revise your search, or use the "Add Pet" form above to add information for new pets at your shelter.</p>
                </>
            )
        }
    }

    return (
        <Container id="manage-pets">
            <br />
            <h2>Manage Pets</h2>

            <br />
            {/* <Container>
                <Button id="add-pet-button" variant="light" onClick={handleShow}>
                    Add New Pet
                </Button>
                <Modal show={showModal} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a New Pet to your Shelter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewPetForm handleAddPet={handleAddPet} handleClose={handleClose} />
                    </Modal.Body>
                </Modal>
            </Container>
            <br /> */}
            <div className="pet-search-bar">
                <Form>
                    <Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Group >
                                <Form.Control type="text" id="search-bar" className="search-bar-item" placeholder="Search" onChange={(event) => setSearchText(event.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Form.Group id="species-select" >
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" className="search-bar-item" id="dropdown-basic-button">
                                        Type(s) of Pet
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu id="species-menu">
                                        {allPets.map(animal => {
                                            return <Form.Check className="species-option" defaultChecked={interestedIn.includes(animal)} key={animal} label={animal} value={animal} onChange={(event) => modifyWantedAnimals(event.target.value)} />
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Form.Group id="age-select">
                                <Dropdown>
                                    <Dropdown.Toggle className="search-bar-item" variant="light" id="dropdown-basic-button">
                                        Age Range
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu id="age-menu">
                                        <Row className="align-items-center">
                                            <Col xs="auto">
                                                <Form.Control type="number" min="0" max="99" value={lowerAge} onChange={event => setLowerAge(event.target.value)} />
                                            </Col>
                                            <Col xs="auto">TO</Col>
                                            <Col xs="auto">
                                                <Form.Control type="number" min="1" max="99" maxLength="2" placeholder="99" value={upperAge} onChange={event => setUpperAge(event.target.value)} />
                                            </Col>
                                        </Row>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Container>
                                <Button id="add-pet-button" variant="light" onClick={handleShow}>
                                    Add New Pet
                                </Button>
                                <Modal show={showModal} onHide={handleClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a New Pet to your Shelter</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <NewPetForm handleAddPet={handleAddPet} handleClose={handleClose} />
                                    </Modal.Body>
                                </Modal>
                            </Container>
                        </Col>
                    </Row>
                </Form>
            </div>
            {/* <div className="pet-search-bar">
                <Form>
                    <Form.Group >
                        <Form.Label for="pet-search">Search for a Pet:</Form.Label>
                        <Form.Control type="text" placeholder="Search" onChange={(event) => setSearchText(event.target.value)} />
                    </Form.Group>
                </Form>
            </div> */}
            <br />
            <Container id="shelter-pet-card-container">
                {petCards()}
            </Container>
        </Container>
    )
}

export default ManagePets