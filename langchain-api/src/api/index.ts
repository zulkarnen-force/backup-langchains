import express from "express";
import path from "path";
import { BotsRouter } from "./routers/BotsRouter.js";
import { UsersRouter } from "./routers/UsersRouter.js";
import bodyParser from "body-parser";
// import cors from 'cors';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


export function StartApi () {
  app.get('/', (req, res) => {
    res.send('welcome botbrigade API');
  });

  BotsRouter(app);
  UsersRouter(app);
  
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}


