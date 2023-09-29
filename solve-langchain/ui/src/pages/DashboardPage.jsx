import { useState } from 'react';
import { Navbar, Nav, Container, Button, Card, Row, Col   } from 'react-bootstrap';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import BotsPage from './BotsPage';
import BotPage from './BotPage';
import SettingsPage from './SettingsPage';
import CreateBotModal from '../components/CreateBotModal';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bots');
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleTabSelect(selectedTab) {
    setActiveTab(selectedTab);
  }

  return (
    <>
      <Navbar bg="light" expand="lg" fixed='top' className='mb-5'>
        <Container>
          <Navbar.Brand href="/dashboard">BotBrigade</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav activeKey={activeTab} onSelect={handleTabSelect} className="me-auto">
              <Nav.Item>
                <Nav.Link eventKey="bots" href="/dashboard/bots">Bots</Nav.Link>
              </Nav.Item>
              <Nav.Item className="ml-auto">
                <Nav.Link eventKey="settings" href="/dashboard/settings">Settings</Nav.Link>
              </Nav.Item>
           
            </Nav>
            <Nav>            
            <Nav.Item >
                <Button variant="primary" onClick={handleShowModal}>Create Bot</Button>
              </Nav.Item>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className='pt-5 mt-3'>

        <Router basename="/app/dashboard">
          <Switch>
            <Route exact path="/dashboard">
              <Redirect to="/dashboard/bots" />
            </Route>
            <Route exact path="/dashboard/bots">
              <BotsPage />
            </Route>
            <Route path="/dashboard/bots/:id">
              <BotPage />
            </Route>
            <Route path="/dashboard/settings">
              <SettingsPage />
            </Route>
          </Switch>
        </Router>
      </Container>
      <CreateBotModal show={showModal} onHide={handleCloseModal} />
    </>
  );
}

export default DashboardPage;