import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain
} from "@fortawesome/free-solid-svg-icons";

function BotsPage() {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    // Fetch bots data from API endpoint
    fetch('http://localhost:3000/bots')
      .then(response => response.json())
      .then(data => setBots(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <h5 className='py-3 text-secondary'>Your Bots</h5>
      <Row>
        {bots.map((bot) => (
          <Col md={4} key={bot.id}>
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <div className="icon">
                      <FontAwesomeIcon icon={faBrain} size='2x'></FontAwesomeIcon>
                    </div>
                    <div className="ms-2 c-details">
                      <h6 className="mb-0">Knowledge Base Conversation</h6>
                    </div>
                  </div>
                  <div className="badge"><span>Design</span></div>
                </div>
              </Card.Header>
              <Card.Body>
                <h3 className="heading">{bot.name}</h3>
                <p>{bot.description}</p>
                <div className="mt-2">
                  <div className="mt-3"><span className="text1">32 Documents, 234 Conversations</span></div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button variant="outline-primary" href={`/botsetting/${bot._id}`}>Detail</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BotsPage;