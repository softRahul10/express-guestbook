const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const path = require('path');

const app = express(); // It will return us a function(req Handler)

app.set('view-engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

var entries = [];
app.locals.entries = entries;

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render("index");
});
app.get("/new-entry", function (req, res) {
    res.render("new-entry");
});
app.post("/new-entry", function (req, res) {
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and a body.");
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});
app.use(function (req, res) {
    res.status(404).render("404");
}); 

http.createServer(app).listen(3000,()=>{
    console.log("Server listening on port 3000");
});