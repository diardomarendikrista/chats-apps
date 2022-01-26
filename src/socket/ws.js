// ws.js
import io from 'socket.io-client';

export const ws = io('http://localhost:4000');
