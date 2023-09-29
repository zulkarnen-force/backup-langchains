import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SettingsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    // Send update request to server using formData
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Settings</h1>
      <Form.Group controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          minLength={8}
        />
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm New Password:</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          minLength={8}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Save Changes</Button>
    </Form>
  );
}

export default SettingsPage;