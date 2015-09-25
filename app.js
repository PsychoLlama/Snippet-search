/*globals require, console */
/*jslint node: true*/
'use strict';

var bodyParser = require('body-parser'),
  routes = require('./routes/index'),
  mongoose = require('mongoose'),
  db = mongoose.connection,
  express = require('express'),
  app = express(),
  Port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express['static']('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect('mongodb://localhost/snippetdata/');

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function () {
  // Routes
  app.get('/codeadded', routes.codeadded);
  app.get('/', routes.index);
  app.post('/search', routes.search);
  app.post('/codeentered', routes.codeentered);
  app.post('/delete', routes["delete"]);
});

app.listen(Port, function () {
  console.log("listening on port", Port);
});

process.on('uncaughtException', function (err) {
  console.log("\nUncaught Exception event\n\n");
  console.log(err);
});
