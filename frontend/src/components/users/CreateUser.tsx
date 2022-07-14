import {Button, Modal, Form} from 'react-bootstrap';
import {useContext, useState} from "react";
import {UserContext} from "./context/UserContext";
import Alert from '@mui/material/Alert';

function CreateUser() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setShowCreateUser, createUser, error} = useContext(UserContext);

  return (
    <Modal.Dialog style={{
      width: "100%",
      zIndex: 400, position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)'
    }}>
      <Modal.Header>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {
            error &&
            Object.keys(error).map(key =>
              <Alert severity="error" key={key}>{key}: {error[key]}</Alert>
            )
          }
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
        <Button variant="secondary" onClick={() => setShowCreateUser(false)}>Close</Button>
        <Button variant="primary" onClick={() => createUser({username, password})}>Submit</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default CreateUser;

