import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default function Navigationbar() {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Design Hub</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/"  className="navlinks">
                    Home
				</Nav.Link>
                <Nav.Link href="/signup"  className="navlinks">
                    SignUp
                </Nav.Link>
                <Nav.Link href="/signin"  className="navlinks">
                    SignIn
                </Nav.Link>

            </Nav>
        </Navbar>
    )
}