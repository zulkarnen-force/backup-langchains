import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Configs";

function CreateBotModal(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL+'/bot', {
        name,
        description,
        type,
      });
      
      // TODO: Handle response from server
      
      // Clear form fields
      setName("");
      setDescription("");
      setType("");
      
      // Close modal
      props.onHide();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Bot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBotName">
            <Form.Label>Bot Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bot name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formBotDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bot description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>

          <Form.Group controlId="formBotType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={handleTypeChange}
            >
              <option value="">Select bot type</option>
              <option value="knowledge">Knowledge Base Conversation</option>
              <option value="data">Data Collection</option>
              <option value="personal">Personal Assistance</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Bot
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateBotModal;
