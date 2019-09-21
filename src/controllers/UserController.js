const express = require('express');
const User = require('../models/user');

const router = express.Router();

//Registrar Usuario
router.post('/register', async (req, res) => {
	try {
		const { email } = req.body;
		if (await User.findOne({ email })) {
			return res.status(400).send({ error: 'Usuario Já existe!' });
		}
		const user = await User.create(req.body);
		return res.status(201).send(user);
	} catch (error) {
		return res.status(500).send({ error: 'Não foi possivel Criar esse Usuario!' });
	}
});

//Deletar Usuario
router.delete('/delete/:id', async (req, res) => {
	try {
		const user = await User.deleteOne({ _id: req.params.id });
		console.log(user);
		res.status(200).send('Usuario deletado com Sucesso');
	} catch (error) {
		res.status(500).send({ error: 'Não foi possivel deletar o Usuario' });
	}
});

module.exports = app => app.use('/user', router);
