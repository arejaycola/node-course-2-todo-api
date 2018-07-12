const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
	if(err){
		return console.log('Unable to connect to the database server.');
	}
	console.log("Connected to MongoDB server...");
	const db = client.db('TodoApp');

	//Delete many
	// db.collection('Todos').deleteMany({test: 'Eat Lunch'}).then((result) => {
	// 	console.log(result);
	// });

	//Delete one
	// db.collection("Todos").deleteOne({text: 'Eat Lunch'}).then((results) => {
	// 	console.log(results);
	// });

	//findOneAndDelete
	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log(result);
	})

	db.collection("Users").deleteMany({name: "Rob"}).then((result) =>{
		console.log(result);
	})

	db.collection('Users').findOneAndDelete({_id: new ObjectID("5b474e734e7e5327d8588528")}).then((result) =>{
		console.log(result);
	})

	// client.close();
});