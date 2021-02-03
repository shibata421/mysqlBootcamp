const express = require("express");
const bodyParser = require('body-parser')
const fs = require("fs");
const mysql = require("mysql");
const path = require('path');

const { host, user, password, database } = JSON.parse(fs.readFileSync("./user.json"));
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host,
  user,
  password,
  database
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './public')))

app.get("/", (req, res) => {
    const q = "SELECT COUNT(*) as total FROM users";
    connection.query(q, (err, results) => {
        if(err) { throw err }
        const total = results[0].total
        res.render('home', { total });
    })
});

app.get("/joke", (req, res) => {
  const joke =
    "<b>What do you call a dog that does magic tricks?</b> <i>A labracadabrador.</i>";
  res.send(joke);
});

app.get("/random_num", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.send("Your lucky number is " + num);
});

app.post("/register", (req, res) => {
    const emailAddress = { email: req.body.email }
    const q = 'INSERT INTO users SET ?'
    connection.query(q, emailAddress, (err, results) => {
        if(err) { throw err }
        console.log('success')
    })
    res.redirect('/');
})

app.listen(port, () => {
  console.log("App listening on port " + port);
});
