/*globals require, console */

  'use strict';

  var bodyParser = require('body-parser'),
    path = require('path'),
      module = require('./databaseinfo'),
      routes = require('.routes'),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    express = require('express'),
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
    var UserSchema = mongoose.Schema({
        Snipplet: []
      }),
      usersinfo = mongoose.model('snippletdata2', UserSchema);



    app.get('/codeadded',routes.codeadded);

    app.get('/', function (req, res) {
      res.render('index', {
        snipplets: ''
      });
    });
    app.post('/search', function (req, res) {
      var title = req.body.search;
      usersinfo.findOne({
        Snipplet: {
          $elemMatch: {
            title: new RegExp(title, "i")
          }
        }
      }, {
        Snipplet: {
          $elemMatch: {
            title: new RegExp(title, "i")
          }
        }
      }, function (err, snipp) {
        if (err) {
          return console.error(err);
        }
        if (snipp) {
          res.render('index', {
            snipplets: snipp.Snipplet[0]
          });
        } else {
          res.render('index', {
            snipplets: null
          });
        }
      });
    });

    app.post('/codeenterd', function (req, res) {
      var updateobject = {
        title: req.body.title,
        body: req.body.codesnippet,
        desc: req.body.description
      };

      usersinfo.update({
        'name': 'codesolutions'
      }, {
        $push: {
          Snipplet: updateobject
        }
      }, {
        upsert: true
      }, function (err) {
        if (err) {
          return console.error(err);
        } else {
          res.redirect('/');
        }
      });
    });


    app.post('/delete', function (req, res) {
      console.log(req.body);
      usersinfo.findOneAndUpdate({
        'name': 'codesolutions'
      }, {
        $pull: {
          Snipplet: {
            body: req.body.filetodelete
          }
        }
      }, function (err) {
        if (err) {
          return console.error(err);
        } else {
          res.redirect('/');
        }
      });

    });

  }); // ending of data base on connect
var Port  = process.env["PORT"] || 8080;
app.listen(Port);

process.on('uncaughtException', function (err) {
  console.log("\n\r Uncaught Exception event \n\r");
  console.log(err);
});
