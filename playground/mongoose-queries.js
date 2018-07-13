const {ObjectID} = require('mongodb');
const {mongoose} = require('./../db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5b489e3f7862060c3cd0596bdd';

// if(!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	// console.log('Todos', todos);
// });


// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	// console.log('Todo', todo);
// });


// Todo.findById(id)
// .then((todo) => {
// 	if(!todo){
// 		return console.log("Id not found.");
// 	}
// 	console.log('Todo By Id', todo);
// }).catch((err) => console.log(err)); 

const id = "5b477b36aa4c4a29d43b54d1";

User.findById(id)
.then((user) => {
	if(!user){
		return console.log("User not found");
	}

	console.log("User ", user);
}, (err) => {
	return console.log(err);
})