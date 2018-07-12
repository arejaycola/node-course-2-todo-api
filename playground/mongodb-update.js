const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
	if(err){
		return console.log('Unable to connect to the database server.');
	}
	console.log("Connected to MongoDB server...");
	const db = client.db('TodoApp');

	//findOneAndUpdate
	// db.collection('Todos').findOneAndUpdate({_id: new ObjectID("5b475fccc260cd38ff778ac8")}, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndUpdate({name: 'Mike'}, {
		$set: {
			name: "Rob"
		}, 
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) =>{
		console.log(result);
	})

	// client.close();
});