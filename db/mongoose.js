const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:admin123@ds229621.mlab.com:29621/todoapp', { useNewUrlParser: true } || 'mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {mongoose};
