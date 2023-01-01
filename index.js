const net = require('net');
module.exports = function fastScanner(host, port, timeout) {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();
        socket.setTimeout(timeout);
        socket.on('connect', () => {
            socket.destroy();
            resolve(`${host}:${port} is open`);
        });
        socket.on('timeout', () => {
            socket.destroy();
            reject(`${host}:${port} is closed`);
        });
        socket.on('error', () => {
            socket.destroy();
            reject(`${host}:${port} is closed`);
        });
        socket.connect(port, host);
    });
};