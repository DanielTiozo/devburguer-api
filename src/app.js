import 'dotenv/config';
import express from 'express';
import { resolve } from 'node:path';
import cors from 'cors';

import routes from './routes.js';

import './database';

class App {
	constructor() {
		this.app = express();

		this.app.use(cors()); // está liberando para todos acessar, para configurar pagina especifica fazer white list
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.json());
		this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));

		this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));
	}
	routes() {
		this.app.use(routes);
	}
}

export default new App().app;
