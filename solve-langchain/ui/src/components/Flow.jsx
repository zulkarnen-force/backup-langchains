import { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useViewport
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, ButtonGroup, Modal, Container, Row, Col, Card } from "react-bootstrap";

import StartNode from "./StartNode";
import ChannelsNode from "./ChannelsNode";
import KnowledgeBaseConversationNode from "./KnowledgeBaseConversationNode";
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

const botID = "simplebot";


//cards components
const components = [
  {
    id: "knowledge-base-conversation",
    title: "Knowledge Base Conversation",
    icon: faBrain,
    selected: false,
  },
  {
    id: "data-collection",
    title: "Data Collection",
    icon: faTableList,
    selected: false,
  },
  {
    id: "intent-identifier",
    title: "Intent Identifier",
    icon: faCircleNodes,
    selected: false,
  },
  {
    id: "open-ended-conversation",
    title: "Open-Ended Conversation",
    icon: faComments,
    selected: false,
  },
];

function ViewportLogger() {
  const { x, y, zoom } = useViewport();

  useEffect(() => {
    console.log(x, y, zoom);
  }, [x, y, zoom]);

  return null;
}

function BotFlow() {
  const [cards, setCards] = useState(components); 
 
  const initialNodes = [
    {
      id: "node-1",
      deletable: false,
      type: "startNode",
      position: { x: 200, y: 350 },
      data: { value: 123 },
    },
    {
      id: "node-2",
      deletable: false,
      type: "channelsNode",
      position: { x: 400, y: 320 }      
    },
  ];

  const initialEdges = [
    { id: "edge-1", source: "node-1", target: "node-2", deletable: false },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showModal, setShowModal] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onEdgesDelete = (edges) => {
    // Do something with the edge that was deleted
  };

  //get data from channelNode

  //const nodeTypes = { startNode: StartNode, channelsNode: ChannelsNode };
  const nodeTypes = useMemo(
    () => ({
      startNode: StartNode,
      channelsNode: ChannelsNode,
      knowledgeBaseConversationNode: KnowledgeBaseConversationNode,
    }),
    []
  );

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSelectingComponent = (index) => {
    let data = cards[index].id;
    let newNode = null;
    let nodeID = botID + "_" + (nodes.length + 1);
    let edgeID = botID + "_edge_" + (edges.length + 1);
    switch (data) {
      case "knowledge-base-conversation":
        newNode = {
          id: nodeID,
          type: "knowledgeBaseConversationNode",
          position: { x: 700, y: 200 },
        };
        break;
    }
    if (newNode == null) return;
    setNodes([...nodes, newNode]);
    createEdge("node-2", nodeID, edgeID);
    handleCloseModal();
  };

  const createEdge = (source, target, id) => {
    let edge = { id: "edge-2", source: source, target: target };
    setEdges([...edges, edge]);
  };

  return (
    <>
      <ButtonGroup vertical style={{position: 'absolute', top: '70px', left: '10px', zIndex: 10}}>
        <Button variant="light" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faBrain} />
        </Button>
        <Button variant="light">
        <FontAwesomeIcon icon={faTools} />
        </Button>
      </ButtonGroup>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>

      <Modal show={showModal} centered onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Component</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              {cards.map((card, index) => (
                <Col style={{ marginBottom: "20px"}} key={index}>
                  <Card
                    style={{height: '130px'}}
                    className="card-button"
                    border={`${card.selected ? "primary" : ""}`}
                    onClick={() => handleSelectingComponent(index)}
                  >
                    <Card.Body className="text-center components">
                      <FontAwesomeIcon
                        icon={card.icon}
                        size="3x"
                      ></FontAwesomeIcon>
                      <p>{card.title}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BotFlow;
