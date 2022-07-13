import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {UserContext} from "../contexts/UserContext";
import {useContext} from "react";
import Axios from "axios";

export function NavBar() {
  const {login, logout, username} = useContext(UserContext);

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
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  : <NavDropdown.Item onClick={() => login({username: 'vitor', password: 'password'})}>Login</NavDropdown.Item>
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
