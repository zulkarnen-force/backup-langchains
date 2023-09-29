import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button, Navbar, Image, Card, Nav } from "react-bootstrap";
import BotFlow from "../components/Flow";

function BotSettingPage() {  
  const {id} = useParams();
  // State variables to hold bot data
  const [bot, setBot] = useState({});

  // Fetch bot data on component mount
  useEffect(() => {
    fetch(`http://localhost:3000/bot/${id}`)
      .then(response => response.json())
      .then(data => setBot(data))
      .catch(error => console.error(error));
  }, [id]);

  // Extract bot properties for form inputs
  const { name, description } = bot;



  function handleSubmit(event) {
    event.preventDefault();

    // TODO: Handle form submit
  }

  return (
    <>
      <div className="vh-100 d-flex flex-row">
        <div className="flex-fill">
          <div className="h-100 d-flex flex-column">
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand>{name}</Navbar.Brand>
               
              </Container>
            </Navbar>
            <div className="flex-fill">
              <BotFlow></BotFlow>
            </div>
          </div>
        </div>

        <div
          className="w-25 border-left"
          style={{ borderLeft: "1px #ccc solid" }}
        >
          <div className="h-100 d-flex flex-column">
            <div className="bg-white flex-fill">

              <div className="d-flex flex-column h-100">
                <div>
                  <Navbar bg="light" expand="lg">
                    <Container>
                      <Navbar.Collapse className="justify-content-start">
                        <Navbar.Text>Chat Emulator</Navbar.Text>
                      </Navbar.Collapse>

                      <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>menu</Navbar.Text>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>
                </div>

                <div className="chat-messages h-100 px-2" style={{backgroundColor: 'white'}}>
                  <div class="chat-message-right py-2">
                    <div>
                      <Image
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        className="rounded-circle mr-1"
                        alt="Chris Wood"
                        width="40"
                        height="40"
                      />                      
                    </div>
                    <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                      <div class="mb-1"><b>You</b></div>
                      Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                      prodesset te vix.
                    </div>
                  </div>

                  <div class="chat-message-left py-2">
                    <div>
                      <Image
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width="40"
                        height="40"
                      />
                    
                    </div>
                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                      <div class="mb-1"><b>BotBrigade</b></div>
                      Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
                      erat animal commodo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-light">
              <Form>
                <Form.Control
                  type="text"
                  style={{ borderRadius: 0 }}
                  placeholder="Type your message..."
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BotSettingPage;
