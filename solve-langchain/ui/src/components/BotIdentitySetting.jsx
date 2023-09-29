import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Configs";

function BotIdentitySetting(props) {
  const {botData} = props;
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (botData) {
      setBotName(botData.name);
      setBotDescription(botData.description);
    }
  }, [botData]);

  const handleSubmit = async (e) => {
    const updatedBot = {
      ...botData,
      name: botName,
      description: botDescription,
      updated_at: new Date(),
    };
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put(API_URL + `/bot/${botData._id}`, updatedBot);
      console.log("Bot updated successfully: ", res.data);
    } catch (err) {
      console.error("Failed to update bot: ", err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="border rounded p-3 mb-4">
              <h5>Bot Identity</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="botName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter bot name"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="botDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter bot description"
                    value={botDescription}
                    onChange={(e) => setBotDescription(e.target.value)}
                  />
                </Form.Group>
                <div className="pt-3">
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BotIdentitySetting;
