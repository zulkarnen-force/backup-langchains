import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { API_URL } from "../Configs";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Tabs,
  Tab,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const acceptedFileTypes = ["application/pdf", "text/plain"];

function BotKnowledgeSetting(props) {
  let { botId, botType } = useParams();
  const [knowledges, setKnowledges] = useState([]);
  const [dropAreaText, setDropAreaText] = useState(
    `Drag 'n' drop some files here, or click to select files`
  );
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(new FormData());
  const [isUploading, setIsUploading] = useState(false);
  const [loadingState, setLoadingState] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/files/${botId}`)
      .then((response) => setKnowledges(response.data))
      .catch((error) => console.error(error));
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    let file = acceptedFiles[0];
    let type = file.type;
    setDropAreaText(file.name);
    if (acceptedFileTypes.indexOf(type) < 0) return;
    setReadyToUpload(true);
    const updatedForm = new FormData();
    updatedForm.append("file", file);
    updatedForm.append("botId", botId);
    setFileToUpload(updatedForm);
  }, []);

  const handleUploadFile = async () => {
    setIsUploading(true); // set loading state
    try {
      const res = await axios.post(API_URL + `/file/upload`, fileToUpload);
      console.log("Bot updated successfully: ", res.data);
    } catch (err) {
      console.error("Failed to update bot: ", err);
    } finally {
      setIsUploading(false); // reset loading state
    }
  };

  const handleAddKnowledgeToBot = async (fileId, index) => {
     setLoadingState((prevState) => ({
        ...prevState,
        [index]: true,
      }));
    try{     
      const res = await axios.post(API_URL + `/file/addknowledge`, {fileId: fileId});
      console.log("Bot updated successfully: ", res.data);
    }catch(err){
      console.log(err);
    }finally{
      setLoadingState((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="border rounded p-3 mb-4">
            <h5>Bot Knowledge</h5>
            <Tabs
              defaultActiveKey="doc"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="doc" title="Upload Document">
                {knowledges.length > 0 ? (
                  <div className="my-3">
                    <h6 className="py-2">Documents:</h6>
                    {knowledges.map((knowledge, index) => (
                      <div className="d-flex flex-row align-items-top">
                        <FontAwesomeIcon icon={faFilePdf} size="2x"/>
                        <div className="flex-fill px-2">
                          <p className="m-0 p-0">{knowledge.filename}</p>
                          <small className="text-muted">{knowledge.size}</small>
                        </div>
                        <Button variant="light" size="small" onClick={() => {
            handleAddKnowledgeToBot(knowledge._id, index);
          }}>
                          Add Knowledge to Bot
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>{dropAreaText}</p>
                  )}
                </div>
                <div className="py-3">
                  <Button
                    variant="primary"
                    disabled={!readyToUpload || isUploading}
                    onClick={handleUploadFile}
                  >
                    {isUploading ? "Uploading..." : "Upload Document"}{" "}
                    {/* change button text */}
                  </Button>
                </div>
              </Tab>
              <Tab eventKey="web" title="Grab from Web Page">
                <Form>
                  <Form.Label>Web Page URL</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Insert web page to crawl the content.."
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                      Grab Content
                    </Button>
                  </InputGroup>
                </Form>
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BotKnowledgeSetting;
