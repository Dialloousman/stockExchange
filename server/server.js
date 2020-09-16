const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

console.log("assets path--> ", path.resolve(__dirname, "../assets"));
app.use("/", express.static(path.resolve(__dirname, "../assets")));

app.get("/signin", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../view/signin.html"));
});

app.get("/register", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../view/signup.html"));
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
