import {Button, Modal, Form} from 'react-bootstrap';
import {useContext, useState} from "react";
import {UserContext} from "./context/UserContext";

function LoginModal() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setShowLogin, login} = useContext(UserContext);

  return (
    <Modal.Dialog style={{position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)'}}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
         <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowLogin(false)}>Close</Button>
        <Button variant="primary" onClick={() => login({username, password})}>Submit</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default LoginModal;
