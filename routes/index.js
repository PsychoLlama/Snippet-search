/*globals require*/
/*jslint node: true */

'use strict';

var mongoose = require('mongoose'),
  UserSchema = mongoose.Schema({
    Snipplet: []
  }),
  usersinfo = mongoose.model('snippletdata2', UserSchema);

// Middleware definitions
module.exports = {
  codeadded: function (req, res) {
    res.render('codeadded');
  },

  index: function (req, res) {
    res.render('index', {
      snipplets: ''
    });
  },

  search: function (req, res) {
    var title = req.body.search,
      searchData = {
        Snipplet: {
          $elemMatch: {
            title: new RegExp(title, "i")
          }
        }
      };

    usersinfo.findOne(searchData, searchData, function (err, snipp) {
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
  },

  codeentered: function (req, res) {
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
  },

  "delete": function (req, res) {
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
  }
};
