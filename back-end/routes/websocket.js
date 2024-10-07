const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const ws = new WebSocket('wss://challenge.sedilink.co.za:3006');
const stringToReverse = 'Please reverse this message'

ws.on('open', function open() {
    const message = stringToReverse;
    ws.send(message);
    console.log('Message sent:', message);
});

ws.on('error', function (error) {
    console.error('WebSocket error:', error);
});

ws.on('message', function incoming(data) {
    const receivedMessage = data.toString();
    console.log('Received:', receivedMessage);
    let receivedMessageReversed = ""

    for (var i = receivedMessage.length - 1; i >= 0; i--) {
        receivedMessageReversed += receivedMessage[i]
    }

    if (receivedMessageReversed === stringToReverse) {
        console.log("String reversed correctly")
    } else {
        console.log("String reversed incorrectly")
    }
})

module.exports = router;