const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unable to connect to the database server.');
	}
	console.log();
	console.log("Connected to MongoDB server");
	const db = client.db('TodoApp');

	

	// db.collection('Todos').insertOne({
	// 	text: "Something to do",
	// 	completed: false
	// }, (err, result) =>{
	// 	if(err){
	// 		return console.log('Unable to insert todo', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });


	// db.collection('Users').insertOne({
	// 	name: 'Rob',
	// 	age: 29,
	// 	location: 'Dayton'
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	// })

	client.close();
});