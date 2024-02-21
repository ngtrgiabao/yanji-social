import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  ShieldCheck,
  MailCheck,
  LockKeyhole,
  AtSign
} from "lucide-react";

import { getUserByID } from "../../../../../../redux/request/userRequest";

const UpsertModal = (props) => {
  function fetchUser() {
    console.log(props.userId);
    // getUserByID(author, dispatch).then((data) => {
    //   setAuthorInfo(data.user);
    // });
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Modal
      {...props}
      size="md"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="fs-2">
          Update user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className='fs-4'>
            <AtSign size={18} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className='fs-4'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className='fs-4'>
            <LockKeyhole size={18} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className='fs-4'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className='fs-4'>
            <ShieldCheck size={18} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className='fs-4'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className='fs-4'>
            <MailCheck size={18} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className='fs-4'
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button className='fs-5 rounded rounded-2' onClick={props.onHide}>Save</Button>
        <Button className='fs-5 rounded rounded-2' onClick={props.onHide} variant='outline'>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpsertModal