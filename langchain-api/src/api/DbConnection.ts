import { Db, MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/botbrigade';

class DbConnection { 
  client: MongoClient;
  db: Db;
  async connect() {
    this.client = await MongoClient.connect(uri);
    this.db = this.client.db('botbrigade');
    return this.db;
  }
  async stop()
  {
    this.client.close();
  }
}

export default DbConnection;