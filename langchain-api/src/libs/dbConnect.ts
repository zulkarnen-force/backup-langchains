import { Client } from "pg";

const client = new Client(process.env.DATABASE_URL);

export class DbConnect {
    async addChatHistory(userID: string, content: string, speaker: string)
    {       
        try {
            await client.connect();
            const query = {
                text: 'INSERT INTO messages (user_id, content, speaker) VALUES ($1, $2, $3)',
                values: [userID, content, speaker]
            }
            const result = await client.query(query);
            console.log(`Inserted ${result.rowCount} row(s)`);
        } catch (err) {
            console.error("error executing query:", err);
        } finally {
            client.end();
        }
    }
}