const User = require('../models/user');
const Car = require('../models/car');
const Joi = require('joi');

module.exports = {
	// index: (req, res, next) => {
	// 	User.find({})
	// 		.then(users => {
	// 			res.status(200).json(users);
	// 		})
	// 		.catch(err => {
	// 			next(err)
	// 		});
	// },

	index: async (req, res, next) => {
		const users = await User.find({});
		res.status(200).json(users);
	},

		// newUser: (req, res, next) => {
	// 	const newUser = new User(req.body);
	// 	newUser.save()
	// 		.then(user => {
	// 			res.status(201).json(user);
	// 		})
	// 		.catch(err => {
	// 			next(err)
	// 		});
	// }

	newUser: async (req, res, next) => {
		const newUser = new User(req.value.body);
		const user = await newUser.save();
		res.status(201).json(user);
	},

	getUser: async(req, res, next) => {
		const {userId} = req.value.params;
		const user = await User.findById(userId);
		res.status(200).json(user);

	},

	replaceUser: async(req, res, next) => {
		const {userId} = req.value.params;
		const newUser = req.value.body;
		const user = await User.findByIdAndUpdate(userId, newUser);
		res.status(200).json(user);
	},

	updateUser: async(req, res, next) => {
		const {userId} = req.value.params;
		const newUser = req.value.body;
		const user = await User.findByIdAndUpdate(userId, newUser);
		res.status(200).json(user);
	},

	getUserCars: async(req, res, next) => {
		const {userId} = req.value.params;
		const user = await User.findById(userId).populate('cars');
		res.status(200).json(user.cars);
	},

	addUserCar: async(req, res, next) => {
		const {userId} = req.value.params;
		const user = await User.findById(userId)

		const newCar = new Car(req.value.body);
		newCar.seller = user;

		user.cars.push(newCar);

		await newCar.save();
		await user.save();
		res.status(201).json(newCar);
	}
};