import { BotsModel } from "api/models/BotsModel.js";
import { Bot} from "api/models/DataModels.js";


export function BotsRouter(app: any): void {
  app.get("/bots", async (req: any, res: any) => {
    const result = await new BotsModel().findAll();
    res.json(result);
  });
  app.get("/bot/:id", async (req: any, res: any) => {
    const result = await new BotsModel().findOne(req.params.id);
    res.json(result);
  });
  app.post("/bot", async (req: any, res: any) => {
    const bot: Bot = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      owner: "faridsurya",
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
    };
    const result = await new BotsModel().write(bot);
    res.json(result);
  });
  app.put("/bot/:id", async (req: any, res: any) => {
    const id = req.params.id;
    const bot: Bot = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      owner: "faridsurya",
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
    };
    const result = await new BotsModel().update(bot, id);
    res.json(result);
  });
}
