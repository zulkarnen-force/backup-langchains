import express from "express";
import path from "path";
import { BotsRouter } from "./routers/BotsRouter.js";
import { UsersRouter } from "./routers/UsersRouter.js";
import bodyParser from "body-parser";
import cors from 'cors';
import { FilesRouter } from "./routers/FilesRouter.js";
import { fsync } from "fs";
import { SocketServer } from "channels/web.js";
import http from "http"



const app = express();
const httpServer = http.createServer(app)
// const app_ui= express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
let PATH = __dirname + "/build";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PATH.slice(1)))



export function StartApi () {
  let WSServer = new SocketServer(httpServer);
  let server = WSServer.getServer();
  server.on('connection', (socket) => {
    console.log('server connection')
  })
  app.get('/',(req, res)=>{
    res.send('Botbrigade API');
  })
  
  BotsRouter(app);
  UsersRouter(app);
  FilesRouter(app);  
  httpServer.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}


