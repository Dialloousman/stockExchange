const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const authController = require("./controllers/authController");

app.use("/", express.static(path.resolve(__dirname, "../assets")));

app.get("/signin", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../view/signin.html"));
});

app.post("/authenticate", authController.signin, (req, res) => {
	const { userFound } = res.locals;
	// console.log("2. => RES LOCALS [server.js]", res.locals.userFound);
	if (userFound.isAuthenticated) {
		res.status(200).sendFile(path.resolve(__dirname, "../view/transactions.html"));
		return;
	}
	return res.status(200).sendFile(path.resolve(__dirname, "../view/signin.html"));
});

app.get("/register", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../view/signup.html"));
});

app.get("/portfolio", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../view/portfolio.html"));
});

app.get("/transactions", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../view/transactions.html"));
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
