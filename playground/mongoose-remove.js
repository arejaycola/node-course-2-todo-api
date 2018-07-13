const {ObjectID} = require('mongodb');
const {mongoose} = require('./../db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
	console.log(result);
});

// Todo.findOneAndRemove()

// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5b48bb79e9cdc4e6b9cadcf0').then((todo) => {
	console.log(todo);
})