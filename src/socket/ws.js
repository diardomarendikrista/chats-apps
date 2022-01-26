// ws.js
import io from 'socket.io-client';

export const ws = io('https://petekchat.herokuapp.com');
