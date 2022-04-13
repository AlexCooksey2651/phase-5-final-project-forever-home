import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function NavBar({ handleLogout }) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><em>Forever Home</em></Navbar.Brand>
                <Nav align="end" className="ml-auto">
                    <Nav.Link href="manage_pets">Pets</Nav.Link>
                    <Nav.Link href="/view_applications">Applications</Nav.Link>
                    <Nav.Link href="/previous_adoptions">Previous Adoptions</Nav.Link>
                    <Nav.Link href="/profile">Account</Nav.Link>
                    <Nav.Link id="logout-button" onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar