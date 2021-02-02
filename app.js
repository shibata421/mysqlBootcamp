const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello from our web app!!");
})

app.get("/joke", (req, res) => {
    const joke = "What do you call a dog that does magic tricks? A labracadabrador.";
    res.send(joke);
})

app.get("/random_num", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.send("Your lucky number is " + num);
})

app.listen(port, () => {
    console.log('App listening on port ' + port)
})