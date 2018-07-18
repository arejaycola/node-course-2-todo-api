require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


const {mongoose} = require('../db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});	
});

app.get('/todos', function(req, res){
	Todo.find().then((todos) => {
		res.send({todos: todos});
	}, (err) => {
		res.status(400).send(err);
	})
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo: todo});

	}).catch((err) => {
		res.status(400).send();
	});
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}

		res.status(200).send({todo: todo});
	}).catch((err) => {
		return res.status(404).send();
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;

	/* Only add the text and completed properties (if exist) to the body object */
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
		if(!todo){
			return res.status(400).send();
		}

		res.status(200).send({todo: todo});

	}).catch((e) => {
		res.status(400).send();
	})
});


app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	// This would also work	var user = new User(body);
	var user = new User({
		email: body.email,
		password: body.password
	});

	user.save().then(() =>{
		// res.send(user);
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/users/me', authenticate,  (req, res) => {
	res.send(req.user);
});

app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
});


app.listen(port, () => {
	console.log('Started on port ' + port);
});


module.exports = {
	app: app
};