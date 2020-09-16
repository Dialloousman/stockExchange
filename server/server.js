const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = "body-parser";

const authController = require("./controllers/authController");

app.use("/", express.static(path.resolve(__dirname, "../assets")));

app.get("/signin", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../view/signin.html"));
});

app.get("/authenticate", authController.signin, (req, res) => {
	const { userFound } = res.locals;
	if (userFound) {
		// console.log("user found from [Server.js]");
		res.sendFile(path.resolve(__dirname, "../view/transactions.html"));
		return;
	}
	res.sendFile(path.resolve(__dirname, "../view/signin.html"));
});

app.get("/register", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../view/signup.html"));
});

app.get("/portfolio", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../view/portfolio.html"));
});

app.get("/transactions", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../view/transactions.html"));
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
