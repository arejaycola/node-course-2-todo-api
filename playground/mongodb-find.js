const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
	if(err){
		return console.log('Unable to connect to the database server.');
	}
	console.log();
	console.log("Connected to MongoDB server");
	const db = client.db('TodoApp');

	// db.collection('Todos').find({_id: new ObjectID("5b474db711f2832af0055df9")}).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));

	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	db.collection('Users').find({name: 'Rob'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));

	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	// client.close();
});