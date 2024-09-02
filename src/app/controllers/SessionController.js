import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
	async store(req, res) {
		const schema = Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
		});

		const isValid = await schema.isValid(req.body);

		if (!isValid) {
			return res.status(401).json({ error: 'Make sure your email or password are correct!' });
		}

		const { email, password } = req.body;

		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(401).json({ error: 'Make sure your email or password are correct!' });
		}

		const isSomePassword = await user.comparePassword(password);

		if (!isSomePassword) {
			return res.status(401).json({ error: 'Make sure your email or password are correct!' });
		}

		return res.status(201).json({
			id: user.id,
			name: user.name,
			email,
			admin: user.admin,
			token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();