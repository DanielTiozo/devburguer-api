import Sequelize from 'sequelize';

// import configDatabase from '../config/database.js';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Category';
import mongoose from 'mongoose';

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		// this.connection = new Sequelize(configDatabase);
		this.connection = new Sequelize(
			'postgresql://postgres:UPoZgquCscsybfNlzxeDFdFQKsFXmPea@junction.proxy.rlwy.net:49776/railway',
		);

		models
			.map((model) => model.init(this.connection))
			.map((model) => model.associate && model.associate(this.connection.models));
	}

	mongo() {
		// this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburguer');
		this.mongoConnection = mongoose.connect(
			'mongodb://mongo:rFyFRWQzCSFyyLFyvRuKxFHnWGNnxdJr@junction.proxy.rlwy.net:29905',
		);
	}
}

export default new Database();
