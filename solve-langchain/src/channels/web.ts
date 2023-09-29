import { Server } from 'socket.io'

export class SocketServer {
    server: Server;
    constructor(app: any) {
        this.server = new Server(app, {
            cors: {
                origin: "*"
            }
        })
    }

    getServer(): Server {
        return this.server;
    }
}