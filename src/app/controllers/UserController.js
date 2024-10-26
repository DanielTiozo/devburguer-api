import { v4 } from 'uuid';

<<<<<<< HEAD
import User from '../models/User';
=======
import User from '../models/User.js';
>>>>>>> 767ebb1665e947fcd691d3a02b2dd18d203f277c
import * as Yup from 'yup';

class UserController {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().strict().required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
			admin: Yup.boolean(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}

		const { name, email, password, admin } = req.body;

		const userExists = await User.findOne({
			where: {
				email,
			},
		});

		if (userExists) {
			return res.status(400).json({ error: 'User already exits' });
		}

		const user = await User.create({
			id: v4(),
			name,
			email,
			password,
			admin,
		});

		return res.status(201).json({
			id: user.id,
			name,
			email,
			admin,
		});
	}
}

export default new UserController();
