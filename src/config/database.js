module.exports = {
	dialect: 'postgres',
	// url: 'postgresql://postgres:dnXplnXJGjKxDfaYdtQvIrHdXBNKPsSx@junction.proxy.rlwy.net:39367/railway',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'devburguer',
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
