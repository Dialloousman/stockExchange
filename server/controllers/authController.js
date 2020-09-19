const db = require("../models/UserModel");

const authController = {};

const users = [
	{
		userEmail: "foo@bar.com",
		userPassword: "barbar",
		name: "Foobaria",
	},
	{
		userEmail: "f@bar.com",
		userPassword: "bbar",
		name: "Foobur",
	},
];

authController.signin = (req, res, next) => {
	const { userEmail, userPassword } = req.body;

	const query = `SELECT * from users WHERE email='${userEmail}'`;
	db.query(query, null, (err, result) => {
		if (err) {
			return next(err);
		}
		const user = result.rows[0];
		res.locals.userFound = {
			user,
			isAuthenticated: user.password === userPassword,
		};
		return next();
	});
};

authController.register = (req, res, next) => {};

module.exports = authController;
