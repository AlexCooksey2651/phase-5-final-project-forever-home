import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { UserContext } from '../context/user'
import { isCustomer } from '../Resources'

function NavBar({ handleLogout, user }) {
    // const { user } = useContext(UserContext)

    //     return (
    //         { isCustomer(user) ? "hello" : : "goodbye"}
    //             <Navbar bg="dark" variant="dark">
    //                 <Container>
    //                     <Navbar.Brand href="/home"><em>Forever Home</em></Navbar.Brand>
    //                     <Nav align="end" className="ml-auto">
    //                         <Nav.Link href="search-pets">Search</Nav.Link>
    //                         <Nav.Link href="/bookmarked-pets">Bookmarked Pets</Nav.Link>
    //                         <Nav.Link href="/my-applications">My Applications</Nav.Link>
    //                         <Nav.Link href="/messages">Messages</Nav.Link>
    //                         <Nav.Link href="/profile">Account</Nav.Link>
    //                         <Nav.Link id="logout-button" onClick={handleLogout}>Logout</Nav.Link>
    //                     </Nav>
    //                 </Container>
    //             </Navbar > 
    //             : 
    //             <Navbar bg="dark" variant="dark">
    //                 <Container>
    //                     <Navbar.Brand href="/home"><em>Forever Home</em></Navbar.Brand>
    //                     <Nav align="end" className="ml-auto">
    //                         <Nav.Link href="manage-pets">Pets</Nav.Link>
    //                         <Nav.Link href="/view-applications">Applications</Nav.Link>
    //                         <Nav.Link href="/previous-adoptions">Previous Adoptions</Nav.Link>
    //                         <Nav.Link href="/messages">Messages</Nav.Link>
    //                         <Nav.Link href="/profile">Account</Nav.Link>
    //                         <Nav.Link id="logout-button" onClick={handleLogout}>Logout</Nav.Link>
    //                     </Nav>
    //                 </Container>
    //             </Navbar>}
    //     )
    // }

    if (user.profile.type === "customer") {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home"><em><b>FOREVER HOME</b></em></Navbar.Brand>
                    <Nav align="end" className="ml-auto">
                        <Nav.Link href="search-pets">Search</Nav.Link>
                        <Nav.Link href="/bookmarked-pets">Bookmarked Pets</Nav.Link>
                        <Nav.Link href="/my-applications">My Applications</Nav.Link>
                        <Nav.Link href="/messages">Messages</Nav.Link>
                        <Nav.Link href="/profile">Account</Nav.Link>
                        <Nav.Link id="logout-button" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    } else if (user.profile.type === "shelter") {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home"><em><b>FOREVER HOME</b></em></Navbar.Brand>
                    <Nav align="end" className="ml-auto">
                        <Nav.Link href="manage-pets">Pets</Nav.Link>
                        <Nav.Link href="/view-applications">Applications</Nav.Link>
                        <Nav.Link href="/previous-adoptions">Previous Adoptions</Nav.Link>
                        <Nav.Link href="/messages">Messages</Nav.Link>
                        <Nav.Link href="/profile">Account</Nav.Link>
                        <Nav.Link id="logout-button" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default NavBar