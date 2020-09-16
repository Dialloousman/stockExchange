const authController = {};

const users = [
	{
		userEmail: "foo@bar.com",
		userPassword: "barbar",
		name: "Foobaria",
	},
];

function userFoundInDatabase(email, passWord, users) {
	for (let user of users) {
		if (user.userEmail === email && user.userPassword === passWord) return true;
	}

	return false;
}

authController.signin = (req, res, next) => {
	// const {userEmail, userPassword} = req.body;
	// console.log("auth controller hit in [authController.js]");
	const userEmail = "foo@bar.com";
	const userPassword = "barbar";

	if (userFoundInDatabase(userEmail, userPassword, users)) {
		res.locals.userFound = true;
		next();
		return;
	}
	res.locals.userFound = false;
	next();
};
authController.register = (req, res, next) => {};

module.exports = authController;
