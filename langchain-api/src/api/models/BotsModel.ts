import { Bot } from "./DataModels.js";
import DbConnection from "../DbConnection.js";
import { ObjectId } from 'mongodb';

export class BotsModel{
    async findAll()
    {
        const db = await new DbConnection().connect();
        const collection = db.collection('bots');
        const result = await collection.find({}).toArray();
        return result;
    }
    async findOne(id:string)
    {
        const db = await new DbConnection().connect();
        const collection = db.collection('bots');
        const result = await collection.findOne({ _id: new ObjectId(id) });
        return result;
    }
    async write(bot: Bot)
    {
        const db = await new DbConnection().connect();
        const collection = db.collection('bots');
        const result = await collection.insertOne(bot);
        return result;
    }
}