import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <button className="btn btn-primary w-100" type="submit">
                  Log In
                </button>
              </Form>
              <div className="mt-3 text-center">
                Don't have an account? <a href="/register">Register here.</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;