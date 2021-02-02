const express = require("express");
const fs = require("fs");
const mysql = require("mysql");

const userData = JSON.parse(fs.readFileSync("./user.json"));
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: userData.host,
  user: userData.username,
  password: userData.password,
  database: userData.database
});

app.get("/", (req, res) => {
    const q = "SELECT COUNT(*) as total FROM users";
    connection.query(q, (err, results) => {
        if(err) { throw err }
        res.send("We have " + results[0].total + " users");
    })
});

app.get("/joke", (req, res) => {
  const joke =
    "What do you call a dog that does magic tricks? A labracadabrador.";
  res.send(joke);
});

app.get("/random_num", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.send("Your lucky number is " + num);
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
