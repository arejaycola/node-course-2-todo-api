var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => { //because a promise is returned.
		if(!user){
			return Promise.reject();// This will go right to the error case. 
		}

		req.user = user;
		req.token = token;

		next();
	}).catch((e) => {
		res.status(401).send();
	});
};

module.exports = {authenticate: authenticate};