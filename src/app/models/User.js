import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
				passwordHash: Sequelize.STRING,
				admin: Sequelize.BOOLEAN,
			},
			{
				sequelize,
			},
		);

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.passwordHash = await bcrypt.hash(user.password, 10);
			}
		});
		return this;
	}
	async comparePassword(password) {
		return bcrypt.compare(password, this.passwordHash);
	}
}

export default User;
