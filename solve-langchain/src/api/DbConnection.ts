import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';

class DbConnection { 
  client: any;
  async connect() {
    this.client = await MongoClient.connect(uri);
    return this.client.db('botbrigade');  
  }
  async stop()
  {
    this.client.close();
  }
}

export default DbConnection;