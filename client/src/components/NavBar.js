import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Forever Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="manage_pets">Manage Pets</Nav.Link>
                    <Nav.Link href="/view_applications">View Applications</Nav.Link>
                    <Nav.Link href="/previous_adoptions">Previous Adoptions</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link id="logout-button" >Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar