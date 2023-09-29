import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../Configs";
import axios from "axios";
import { Container, Navbar, Form, Button, Image } from "react-bootstrap";
import ChattingEmulator from "../components/ChattingEmulator";
import BotKnowledgeSetting from "../components/BotKnowledgeSetting";
import BotIdentitySetting from "../components/BotIdentitySetting";
import BotChannelsSetting from "../components/BotChannelsSetting";

function BotPage() {
  let { botId, botType } = useParams();

  // State variables to hold bot data
  const [bot, setBot] = useState({});
  const { name, description } = bot;

  // Use the `id` variable to fetch data for the selected bot
  // and render the bot details

  // Fetch bot data on component mount
  useEffect(() => {
    axios
      .get(`${API_URL}/bot/${botId}`)
      .then((response) => setBot(response.data))
      .catch((error) => console.error(error));
  }, [botId]);

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
            <div className="flex-fill pb-5" style={{ overflowY: "scroll" }}>
             <BotIdentitySetting botData={bot} />
             <BotKnowledgeSetting botID={bot._id}/>
            </div>
          </div>
        </div>

        <div
          className="w-25 border-left"
          style={{ borderLeft: "1px #ccc solid" }}
        >
          <ChattingEmulator />
        </div>
      </div>
    </>
  );
}

export default BotPage;
