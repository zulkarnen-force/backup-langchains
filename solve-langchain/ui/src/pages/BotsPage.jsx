import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain
} from "@fortawesome/free-solid-svg-icons";
import CreateBotModal from '../components/CreateBotModal';
import axios from 'axios';
import { API_URL } from '../Configs';

function BotsPage() {
  const [bots, setBots] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/bots')
      .then(response => setBots(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <h5 className='py-3 text-secondary'>Your Bots</h5>
      <Row>
        {bots.map((bot) => (
          <Col md={4} key={bot._id}>
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <div className="icon">
                      <FontAwesomeIcon icon={faBrain} size='2x'></FontAwesomeIcon>
                    </div>
                    <div className="mx-2 c-details">
                      <p className="mb-0" style={{lineHeight: '18px', fontSize:'14px'}}>Knowledge Base Conversation</p>
                    </div>
                  </div>
                  <div className="badge bg-primary"><span>Active</span></div>
                </div>
              </Card.Header>
              <Card.Body>
                <h3 className="heading">{bot.name}</h3>
                <p>{bot.description}</p>
              </Card.Body>
              <Card.Footer className='d-flex flex-row align-items-center'>
                <Button variant="outline-primary" href={`/botsetting/${bot.type}/${bot._id}`}>Detail</Button>
                <div className='flex-fill'></div>
                <div style={{fontSize: '12px'}}><span className="text1">32 Documents, 234 Conversations</span></div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <CreateBotModal />
    </Container>
  );
}

export default BotsPage;