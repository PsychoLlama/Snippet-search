/*globals require, console */
/*jslint node: true*/
'use strict';

var bodyParser = require('body-parser'),
  routes = require('./routes/index'),
  mongoose = require('mongoose'),
  db = mongoose.connection,
  express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express['static']('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/snippetdata/');
db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function () {
  // Routes
  app.get('/', routes.index)
    .get('/codeadded', routes.codeadded)
    .post('/search', routes.search)
    .post('/codeentered', routes.codeentered)
    .post('/delete', routes["delete"]);
});

app.listen(port, function () {
  console.log("listening on port", port);
});

process.on('uncaughtException',
   console.log.bind(console, "Uncaught Exception:"));
