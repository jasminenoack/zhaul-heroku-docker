import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {useContext} from "react";
import React from 'react';
import {UserContext} from "./users/context/UserContext";

export function NavBar() {
  const {showLogin, logout, username, setShowLogin, showCreateUser, setShowCreateUser} = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ZHaul</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title={username ? username : "Account"} id="basic-nav-dropdown">
              {
                username ?
                  <React.Fragment><NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item></React.Fragment>
                  : <React.Fragment>
                    <NavDropdown.Item onClick={() => setShowLogin(!showLogin)}>Login</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setShowCreateUser(!showCreateUser)}>Create User</NavDropdown.Item>
                  </React.Fragment>
              }

              <NavDropdown.Item href="/reservations">
                Reservations
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

