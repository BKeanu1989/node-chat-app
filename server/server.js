const path = require('path');

const express = require('express');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '/../views'));

app.get('/', (req,res) => {
	res.render('index.html', {});
});


app.listen('port', () => {
	console.log(`Server up at ${port}`);
});

