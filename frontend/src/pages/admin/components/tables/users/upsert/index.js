import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import { getUserByID } from "../../../../../../redux/request/userRequest";

const options = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
];

const UpsertModal = ({ onHide, show, className, userId }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  function fetchUser() {
    getUserByID(userId, dispatch).then((data) => {
      setUser(data.user)
    });
  }

  useEffect(() => {
    fetchUser()
  }, [userId])

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      centered
      className={className}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="fs-2">
          Update user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3 fs-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className='fs-4'
            type="text"
            placeholder="e.g johndoe"
            autoFocus
            value={user.username}
          />
        </Form.Group>
        <Form.Group className="mb-3 fs-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Verify status</Form.Label>
          <Select
            value={user.isVerify}
            // onChange={this.handleChange}
            options={options}
          />
        </Form.Group>
        <Form.Group className="mb-3 fs-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Verify email status</Form.Label>
          <Select
            value={user.isVerify}
            // onChange={this.handleChange}
            options={options}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className='fs-5 rounded rounded-2' onClick={onHide}>Save</Button>
        <Button className='fs-5 rounded rounded-2' onClick={onHide} variant='outline'>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpsertModal