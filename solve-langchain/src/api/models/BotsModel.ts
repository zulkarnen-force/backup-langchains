import { Bot } from "./DataModels.js";
import DbConnection from "../DbConnection.js";
import { ObjectId } from 'mongodb';

export class BotsModel{
    async findAll()
    {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('bots');
        const result = await collection.find({}).toArray();
        connect.stop();
        return result;
    }
    async findOne(id:string)
    {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('bots');
        const result = await collection.findOne({ _id: new ObjectId(id) });
        connect.stop();
        return result;
    }
    async write(bot: Bot)
    {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('bots');
        const result = await collection.insertOne(bot);
        connect.stop();
        return result;
    }
    async update(bot: Bot, id: string)
    {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('bots');
        const result = await collection.updateOne(
            {
                _id : new ObjectId(id)
            },
            {
                $set: bot
            },
            {
                upsert:true
            }
        )
        return result;
    }
}