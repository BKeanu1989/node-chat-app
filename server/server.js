const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
	// socket emits a message to a single connection
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.on('createMessage', (message, callback) => {
		console.log('Create Message:', message);
		// to every 
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});



app.set('views', path.join(__dirname, '/../views'));

app.get('/', (req,res) => {
	res.render('index.html', {});
});


server.listen(port, () => {
	console.log(`Server up at ${port}`);
});

