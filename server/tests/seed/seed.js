const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
	_id: userOneId,
	email: 'andrew@example.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
},{
	_id: userTwoId,
	email: 'bestemailever@example.com',
	password: 'userTwoPass'
}];



const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {

		/*Couldn't do insertMany because it would not run the authenticate middleware.*/
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();
		
		/*Wont get fired until both userone and usertwo promises are resolved. */
		return Promise.all([userOne, userTwo])

	}).then(() => done());
};



module.exports = {
	todos: todos,
	populateTodos: populateTodos,
	users,
	populateUsers
}