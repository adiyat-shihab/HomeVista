// pages/api/socket.js
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';

export default async (req, res) => {
    if (!res.socket.server.io) {
        // Adapt the Next.js net server to an HTTP server
        const httpServer = res.socket.server as any;
        const io = new ServerIO(httpServer, { path: '/api/socketio' });

        io.on('connect', async (socket) => {
            socket.join('main'); // You can customize this room name
            // Add code here to send real-time data to clients
        });

        io.on('disconnect', (socket) => {
            socket.leave('main');
        });

        res.socket.server.io = io;
    }
    res.end();
};
