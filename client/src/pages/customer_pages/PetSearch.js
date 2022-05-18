import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'
import { Container, Form, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap'
import PetCard from '../../components/PetCard'
import { allPets } from '../../Resources'

function PetSearch({ user }) {
    // const { user } = useContext(UserContext)
    const [pets, setPets] = useState([])
    const [searchText, setSearchText] = useState("")
    const [interestedIn, setInterestedIn] = useState(user.profile.customer.interested_in)
    const [lowerAge, setLowerAge] = useState(0)
    const [upperAge, setUpperAge] = useState(99)
    // const [selectAll, setSelectAll] = useState(false)
    console.log(interestedIn)

    useEffect(() => {
        fetch('/customer-pets').then(r => {
            if (r.ok) {
                r.json().then(pets => setPets(pets))
            }
        })
    }, [])

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
            console.log(filtered)
            return filtered
        } else {
            return []
        }
    }

    const ageInYears = (pet) => {
        if (pet.age_unit === "Weeks" || pet.age_units === "Months") {
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

    // function toggleSelectAll() {
    //     if (selectAll === true) {
    //         setInterestedIn([])
    //         setSelectAll(false)
    //     } else if (selectAll === false) {
    //         setInterestedIn(allPets)
    //         setSelectAll(true)
    //     }
    // }

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
                    <Row className="align-items-center">
                        <Col xs={6}>
                            <Form.Group >
                                <Form.Control className="search-bar-item" type="text" id="search-bar" placeholder="Search" onChange={(event) => setSearchText(event.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={3}>
                            <Form.Group id="species-select" >
                                <Dropdown>
                                    <Dropdown.Toggle className="search-bar-item" variant="light" id="dropdown-basic-button">
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
                        <Col xs={3}>
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
                    </Row>
                </Form>
            </div>
            <br />
            {petCards()}
        </Container>
    )
}

export default PetSearch

// type="checkbox" defaultChecked={selectAll} label={allPets} value={allPets} onChange={() => toggleSelectAll()}>{selectAll ? "Unselect All": "Select All"}