// ws.js
import io from 'socket.io-client';

export const ws = io('https://petekchat.herokuapp.com');
// export const ws = io('http://localhost:4000');
