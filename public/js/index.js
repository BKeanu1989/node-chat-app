		var socket = io();
// can't use arrow functions - older or other browsers/mobile included can't interpret them
		socket.on('connect', function() {
			console.log('Connected to server');

			socket.emit('createMessage', {
				from: 'Kevin',
				text: 'great, its working'
			});
		});


		socket.on('disconnect', function() {
			console.log('disconnected from server');
		});


		socket.on('newEmail', function(email) {
			console.log('New Email', email);
		});

		socket.on('newMessage', function(message) {
			console.log('newMessage', message);
		})