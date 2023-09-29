import { File } from "./DataModels.js";
import DbConnection from "../DbConnection.js";
import { ObjectId } from "mongodb";

export class FilesModel{
    async write(file: File) {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('files');
        const result = await collection.insertOne(file);
        connect.stop();
        return result;
    }
    async readById(fileId: string)
    {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('files');
        const filter = {_id: new ObjectId(fileId)};
        const result = await collection.findOne(filter);
        connect.stop();
        return result;
    }
    async readByBotId(botId: string)
    {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('files');
        const filter = {bot_id: botId};
        const result = await collection.find(filter).toArray();
        connect.stop();
        return result;
    }
    async updateById(file: File, fileId:string)
    {
        const connect = new DbConnection();
        const db = await connect.connect();
        const collection = db.collection('files');
        const result = await collection.updateOne(
            {
                _id : new ObjectId(fileId)
            },
            {
                $set: file
            },
            {
                upsert:true
            }
        )
        return result;
    }

}