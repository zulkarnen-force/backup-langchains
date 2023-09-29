import { User } from "api/models/DataModels.js";
import { UsersModel } from "api/models/UsersModel.js";
import { v4 as uuidv4 } from "uuid";
import passwordUtils from "utils/password.js";
import passport from "passport";

export function UsersRouter (app:any) {
    app.post('/auth/login', async(req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error('An error occurred')
                    return next(error)
                }
                req.login(
                    user,
                    {session: false} 
                )
            } catch (error) {
                
            }
        })
    })

    app.get('/user', async (req: any, res: any)=>{
        const result = await new UsersModel().show();
        res.json(result);

    })
}