import { User } from "api/models/DataModels.js";
import { UsersModel } from "api/models/UsersModel.js";

export function UsersRouter (app:any) {
    app.post('/user', async (req: any, res: any)=>{
        const user: User = {
            uid: '',
            displayName: req.body.displayName,
            email:req.body.email,
            password: req.body.password
        }
        const result = await new UsersModel().write(user);
        res.json(result);
    })
}