const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true }));

mongoose.connect('mongodb://localhost:27017/teste_do_pato', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

require('./src/controllers/index')(app);

app.listen(3000, () => {
	console.log('Servidor rodando na porta 3000');
});
