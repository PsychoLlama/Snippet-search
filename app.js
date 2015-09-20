/*globals require, console */

  'use strict';

  var bodyParser = require('body-parser'),
    path = require('path'),
      module = require('./databaseinfo'),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    express = require('express'),
      routes = require('./routes'),
    app = express(),
    server;

  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use('/assets', express['static']('assets'));

  mongoose.connect(module);

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function (callback) {
    app.get('/codeadded',routes.codeadd);
    app.get('/',routes.index);
    app.post('/search',routes.search);
    app.post('/codeenterd',routes.codeadded);
    app.post('/delete',routes.delete);
  }); // ending of data base on connect

var Port  = process.env["PORT"] || 8080;
app.listen(Port);

process.on('uncaughtException', function (err) {
  console.log("\n\r Uncaught Exception event \n\r");
  console.log(err);
});
