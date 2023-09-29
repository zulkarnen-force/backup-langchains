import { BotsModel } from "api/models/BotsModel.js";
import { Bot } from "api/models/DataModels.js";
import {passport} from "passport";

export function BotsRouter (app:any) {
    app.get('/bots', async (req: any, res: any)=>{
        const result = await new BotsModel().findAll();
        res.json(result);
    });
    app.get('/bot/:id',async (req: any, res: any)=>{
        const result = await new BotsModel().findOne(req.params.id);
        res.json(result);
    });
    app.post('/bot', async (req: any, res: any)=>{
        const bot: Bot = {
            name: req.body.name,
            description: req.body.description,
            owner: 'faridsurya',
            created_at: new Date()
        }
        const result = await new BotsModel().write(bot);
        res.json(result);
    })
}