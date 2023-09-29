import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Handle, Position } from "reactflow";
import { faFilePdf, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import DocumentUploaderModal from "./DocumentUploader";

function KnowledgeBaseConversationNode({ data }) {
  const [showModal, setShowModal] = useState(false);

  // Function to handle showing the modal
  const handleOpenModal = () => setShowModal(true);

  return (
    <>
      <Card>
        <Handle type="target" position={Position.Left}></Handle>
        <Card.Header>Knowledge Base Conversation</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Topics:</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>

            <Card.Text>Documents:</Card.Text>
            <div className="d-flex align-items-center mb-3">
              <div className="px-2">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
              <div className="flex-fill" style={{ fontSize: "12px" }}>
                Document title and size <br></br>
                <small className="text-muted">234kb</small>
              </div>
              <div>
                <Button variant="light" size="sm">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          </Form>
          <div className="d-grid gap-2">
            <Button variant="outline-dark" size="sm" onClick={handleOpenModal}>
              Attach Document
            </Button>
          </div>
        </Card.Body>
      </Card>
      <DocumentUploaderModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default KnowledgeBaseConversationNode;
