const express = require('express');
const Task = require('../models/task');

const router = express.Router();

//Criar Tarefas
router.post('/register', async (req, res) => {
	try {
		const { title, project, assignedTo } = req.body;
		if (await Task.findOne({ title })) {
			return res.status(400).send({ error: 'Task Já existe!' });
		}
		const tasks = await Task.create({ title, project, assignedTo });
		return res.status(201).send(tasks);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: 'Não foi possivel Criar sua Task!' });
	}
});
//Listar Tarefas
router.get('/list', async (req, res) => {
	try {
		let task = await Task.find({});
		return res.status(200).send(task);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: 'Não foi possivel listar sua Task!' });
	}
});

//Deletar Tarefas
router.delete('/delete/:id', async (req, res) => {
	try {
		const task = await Task.deleteOne({ _id: req.params.id });
		console.log(task);
		res.status(200).send('Tarefa deletada com Sucesso');
	} catch (error) {
		res.status(500).send({ error: 'Não foi possivel deletar a Tarefa' });
	}
});

//Listar Tarefas de um projeto
router.get('/:id', async (req, res) => {
	try {
		const task = await Task.find({ project: req.params.id });
		console.log(task);
		return res.status(200).send(task);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error:
				'Não foi possivel Listar suas Task com Id do Projeto: ' + req.params.id
		});
	}
});

module.exports = app => app.use('/task', router);
