const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const authController = require("./controllers/authController");
const stocksController = require("./controllers/stocksController");

//--------------------------------------------------serveApp

app.use("/", express.static(path.resolve(__dirname, "../assets")));

//----------------------------------------------------authenticate
app.get("/signin", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../view/signin.html"));
});
app.post("/authenticate", authController.signin, (req, res) => {
	const { userFound } = res.locals;
	if (userFound.isAuthenticated) {
		res
			.status(200)
			.sendFile(path.resolve(__dirname, "../view/transactions.html"));
		return;
	}
	return res
		.status(200)
		.sendFile(path.resolve(__dirname, "../view/signin.html"));
});

app.get("/register", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../view/signup.html"));
});

app.post("/registernewuser", authController.register, (req, res) => {
	res
		.status(200)
		.sendFile(path.resolve(__dirname, "../view/transactions.html"));
});

app.get("/portfolio", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../view/portfolio.html"));
});
//------------------------------------------------------transactions
app.get("/transactions", (req, res) => {
	res
		.status(200)
		.sendFile(path.resolve(__dirname, "../view/transactions.html"));
});

app.post("/updateStocks", stocksController.updateStocksDatabase, (req, res) => {
	res.status(200).json("stocks refreshed");
});


//-------------------------------------------------------------------
app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
