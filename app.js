/*jslint nomen: true*/
/*global require, console, __dirname*/
(function () {
  'use strict';
  var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    server = app.listen(3000, function () {
      var host = server.address().address,
        port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });

  app.set('view engine', 'ejs');


  app.use(bodyParser.urlencoded({
    extended: false
  }));


  mongoose.connect('mongodb://localhost/snippletdata/');

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function (callback) {
    var UserSchema = mongoose.Schema({
        Snipplet: []
      }),
      usersinfo = mongoose.model('Snippetinformation', UserSchema);

    app.get('/', function (req, res) {
      usersinfo.findOne({
        name: 'codesolutions'
      }, function (err, snipp) {
        console.log(snipp || "no snippet");
        if (err) {
          return console.error(err);
        }
        if (snipp) {
          res.render('index', {
            snipplets: snipp.Snipplet
          });
        } else {
          res.render('index', {
            snipplets: []
          });
        }
      });
    });

    app.get('/assets/styles/:sheet', function (req, res) {
      res.sendFile(__dirname + '/assets/styles/' + req.params.sheet);
    });

    app.get('/assets/scripts/:script', function (req, res) {
      res.sendFile(__dirname + '/assets/scripts/' + req.params.script);
    });

    app.get('/assets/directives/:module', function (req, res) {
      res.sendFile(__dirname + '/assets/directives/' + req.params.module);
    });

    app.get('/codeadded', function (req, res) {
      res.render('codeadded');
    });

    app.post('/codeentered', function (req, res) {
      usersinfo.update({
        'name': 'codesolutions'
      }, {
        $set: {
          Snipplet: req.body.added
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

  }); //ending of data base on connect
}());
