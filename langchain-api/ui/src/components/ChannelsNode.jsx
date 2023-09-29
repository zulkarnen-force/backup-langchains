import { useCallback, useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { Handle, Position } from "reactflow";
//fontawesome.library.add(faCheckSquare, faCoffee);
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faWhatsapp,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import {
  faComment,
  faGlobe,
  faPlus,
  faBrain,
  faTableList,
  faCircleNodes,
  faComments,
  faTools
} from "@fortawesome/free-solid-svg-icons";


function ChannelsNode(props) {
  return (
    <>
      <Card style={{ width: "250px" }}>
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>

        <Card.Header className="text-center">Channels</Card.Header>
        <Card.Body>
          <Row className="channel-icons">
            <Col md={4} className="text-center mb-2">
              <FontAwesomeIcon icon={faComment} size="2x"></FontAwesomeIcon>
              <br></br>
              <small>Emulator</small>
            </Col>
            <Col md={4} className="text-center mb-2">
              <FontAwesomeIcon icon={faGlobe} size="2x"></FontAwesomeIcon>
              <br></br>
              <small>Web</small>
            </Col>
            <Col md={4} className="text-center">
              <FontAwesomeIcon icon={faTelegram} size="2x"></FontAwesomeIcon>
              <br></br>
              <small>Telegram</small>
            </Col>
            <Col md={4} className="text-center">
              <FontAwesomeIcon icon={faWhatsapp} size="2x"></FontAwesomeIcon>
              <br></br>
              <small>Whatsapp</small>
            </Col>
            <Col md={4} className="text-center">
              <FontAwesomeIcon
                icon={faFacebookMessenger}
                size="2x"
              ></FontAwesomeIcon>
              <br></br>
              <small>Messanger</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

     
    </>
  );
}

export default ChannelsNode;
