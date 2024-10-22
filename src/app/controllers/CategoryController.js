import * as Yup from 'yup';
import Category from '../models/Category.js';
import User from '../models/User.js';

class CategoryController {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}

		const { admin: isAdmin } = await User.findByPk(req.userId);

		if (!isAdmin) {
			return res.status(401).json();
		}

		const { filename: path } = req.file;
		const { name } = req.body;

		const categoryExist = await Category.findOne({
			where: {
				name,
			},
		});

		if (categoryExist) {
			return res.status(400).json({ error: 'Category already exists!' });
		}

		const { id } = await Category.create({
			name,
			path,
		});

		return res.status(201).json({ id, name });
	}

	async update(req, res) {
		const schema = Yup.object({
			name: Yup.string(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}

		const { admin: isAdmin } = await User.findByPk(req.userId);

		if (!isAdmin) {
			return res.status(401).json();
		}

		const { id } = req.params;

		const categoryExists = await Category.findByPk(id);

		if (!categoryExists) {
			return res.status(400).json({ message: 'Make sure your category ID is correct' });
		}

		let path;
		if (req.file) {
			path = req.file.filename;
		}

		const { name } = req.body;

		if (name) {
			const categoryNameExist = await Category.findOne({
				where: {
					name,
				},
			});

			if (categoryNameExist && categoryNameExist.id != id) {
				return res.status(400).json({ error: 'Category exists!' });
			}
		}

		await Category.update(
			{
				name,
				path,
			},
			{
				where: {
					id,
				},
			},
		);

		return res.status(201).json({ id, name });
	}

	async index(req, res) {
		const categories = await Category.findAll();

		return res.json(categories);
	}
}

export default new CategoryController();
