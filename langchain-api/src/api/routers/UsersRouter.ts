import { User } from "api/models/DataModels.js";
import { UsersModel } from "api/models/UsersModel.js";
// import User from 'api/models/User.js';
import { v4 as uuidv4 } from "uuid";
import passwordUtils from "utils/password.js";
import passport from "passport";

export function UsersRouter (app:any) {
    app.post('/user', passport, async (req: any, res: any)=>{
        let userId: string = uuidv4();

        const user: User = {
            uid: userId,
            displayName: req.body.displayName,
            email:req.body.email,
            password: passwordUtils.hash(req.body.password)
        }


        try {
            const result = await new UsersModel().write(user);
            return res.json({
                result: {
                    'message':'user created successfully',
                    data:{
                        id: userId
                    }
                }
            });
        } catch (err: any) {
            return res.json({
                error: {
                    'message': err.message
                }
            })
        }
        
    })

    app.get('/user', async (req: any, res: any)=>{
        const result = await new UsersModel().show();
        res.json(result);

    })
}