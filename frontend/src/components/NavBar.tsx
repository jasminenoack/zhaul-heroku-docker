import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {UserContext} from "../contexts/UserContext";
import {useContext, useState} from "react";
import Axios from "axios";
import LoginModal from "./Login";
import React from 'react';

export function NavBar() {
  const {showLogin, logout, username, setShowLogin, showCreateUser, setShowCreateUser} = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ZHaul</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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

              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

