const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit('newEmail', {
		from: 'mike@example.com',
		text: 'Hey whazzup',
		createdAt: 123
	});
	// socket emits a message to a single connection
	socket.emit('newMessage', {
		from: 'Test',
		text: 'see this test',
		createdAt: 12343
	})

	socket.on('createMessage', (message) => {
		console.log('Create Message:', message);
		// to every 
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
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

