const express = require('express');
const User = require('../models/user');
const Project = require('../models/project');

const router = express.Router();

//Criar Projetos
router.post('/register', async (req, res) => {
	try {
		const { title, description, owner, tasks } = req.body;
		if (await Project.findOne({ title })) {
			return res.status(400).send({ error: 'Projeto Já existe!' });
		}
		let project = await Project.create({ title, description, owner });
		const savedTasks = [];
		for (let i = 0; i < tasks.length; i++) {
			const task = tasks[i];
			const savedTask = await Task.create({ ...task, project: project._id });
			savedTasks.push(savedTask);
		}
		project = { ...project, tasks: savedTasks };
		return res.status(201).send(project);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.send({ error: 'Não foi possivel Criar seu Projeto!' });
	}
});
//Listar Projetos
router.get('/list', async (req, res) => {
	try {
		let project = await Project.find({});
		return res.status(200).send(project);
	} catch (error) {
		return res
			.status(500)
			.send({ error: 'Não foi possivel listar seus Projetos!' });
	}
});

//Deletar Projetos
router.delete('/delete/:id', async (req, res) => {
	try {
		const project = await Project.deleteOne({ _id: req.params.id });
		console.log(project);
		res.status(200).send('Projeto deletado com Sucesso');
	} catch (error) {
		res.status(500).send({ error: 'Não foi possivel deletar o Projeto' });
	}
});
//Listar Projetos de um Usuario
router.get('/owner/:userId', async (req, res) => {
	try {
		//Nao consegui evoluir tentar novamente
		const project = await Project.find({ owner: req.params.userId });
		console.log(project);
		return res.status(200).send(project);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error:
				'Não foi possivel Listar os Projetos do Usuario com ID: ' +
				req.params.userId
		});
	}
});

module.exports = app => app.use('/project', router);
