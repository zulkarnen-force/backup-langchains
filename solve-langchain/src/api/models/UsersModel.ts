import { User } from "./DataModels.js";
import DbConnection from "../DbConnection.js";

export class UsersModel{
    async write(user: User)
    {
        const db = await new DbConnection().connect();
        const collection = db.collection('users');
        const result = await collection.insertOne(user);
        return result;
    }
}