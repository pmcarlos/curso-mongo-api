const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiCars', {
	useMongoClient: true
});


const app = express();

//Routes
const usersRoute = require('./routes/users');
const carsRoute = require('./routes/cars');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


//Routes
app.use('/users', usersRoute);
app.use('/cars', carsRoute);

//Catch 4040 errors ad fordwards them to error handler function
app.use((req, res, next) => {
	const err = new Error('Not found');
	err.status = 404;
	next(err);
});


//error handler function
app.use((err, req, res, next) => {
	const error = app.get('env') === 'development' ? err : {};
	const status = err.status || 500;

	//Respond to client
	res.status(status).json({
		error: {
			message: error.message
		}
	});

	//Respond to terminal
	console.log(err);
});


//start server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));