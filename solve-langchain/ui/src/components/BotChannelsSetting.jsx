import React from "react";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function BotChannelsSetting() {
  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="border rounded p-3 mb-4">
              <h5 className="mb-3">Bot Channels</h5>

              <Row>
                <Col sm={12} md={12} className="mb-3">
                  <h6>Telegram</h6>
                  <Form>
                    <Form.Label>Bot API</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Telegram bot token.."
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-secondary" id="button-addon2">
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </InputGroup>

                    <Form.Check
                      type="switch"
                      id="telegramSwitch"
                      label="Activate Telegram"
                    />
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BotChannelsSetting;
