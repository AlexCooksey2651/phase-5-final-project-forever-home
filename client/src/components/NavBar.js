import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function NavBar({ user, handleLogout }) {
    if (user.profile_type === "customer") {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><em>Forever Home</em></Navbar.Brand>
                    <Nav align="end" className="ml-auto">
                        <Nav.Link href="search-pets">Search</Nav.Link>
                        <Nav.Link href="/my-applications">My Applications</Nav.Link>
                        <Nav.Link href="/bookmarked-pets">Bookmarked Pets</Nav.Link>
                        <Nav.Link href="/profile">Account</Nav.Link>
                        <Nav.Link id="logout-button" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    } else if (user.profile_type === "shelter") {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><em>Forever Home</em></Navbar.Brand>
                    <Nav align="end" className="ml-auto">
                        <Nav.Link href="manage-pets">Pets</Nav.Link>
                        <Nav.Link href="/view-applications">Applications</Nav.Link>
                        <Nav.Link href="/previous-adoptions">Previous Adoptions</Nav.Link>
                        <Nav.Link href="/profile">Account</Nav.Link>
                        <Nav.Link id="logout-button" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default NavBar