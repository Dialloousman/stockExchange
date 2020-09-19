const db = require("../models/UserModel");
const { query } = require("express");
const path = require("path");

const authController = {};

authController.signin = (req, res, next) => {
	const { userEmail, userPassword } = req.body;
	const queryForUserAccount = `SELECT * from users WHERE email='${userEmail}'`;

	db.query(queryForUserAccount, null, (err, result) => {
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

authController.register = (req, res, next) => {
	const { name, userEmail, userPassword } = req.body;
	// console.log(name, userEmail, userPassword);

	const queryForUserAccount = `SELECT email FROM users WHERE email='${userEmail}';`;

	const queryToAddUser = `
    INSERT INTO Users
    VALUES ( '${userEmail}', '${userPassword}', '${name}', 5000);
    `;
	db.query(queryForUserAccount, null, (err, result) => {
		if (err) {
			return next(err);
		}
		res.locals.userFoundInDatabase = result.rows.length > 0;
		if (res.locals.userFoundInDatabase) {
			res
				.status(200)
				.sendFile(path.resolve(__dirname, "../../view/signin.html"));
			return;
		}
	});

	if (!res.locals.userFoundInDatabase) {
		db.query(queryToAddUser, null, (err, result) => {
			if (err) {
				return next(err);
			}
			return next();
		});
	}
};

module.exports = authController;
