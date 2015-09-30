/*globals require*/
/*jslint node: true */

'use strict';

var mongoose = require('mongoose'),
  UserSchema = mongoose.Schema({
    snippet: []
  }),
  usersinfo = mongoose.model('snippletdata2', UserSchema);

// Middleware definitions
module.exports = {
  codeadded: function (req, res) {
    res.render('codeadded', {
      snippets: null
    });
  },

  // Serve root file
  index: function (req, res) {
    res.render('index', {
      snippets: ''
    });
  },

  // Search snippets
  search: function (req, res) {
    var title = req.body.search,
      query = {
        snippets: {
          $elemMatch: {
            title: new RegExp(title, "i")
          }
        }
      };
    console.log(req.body.search);

    usersinfo.find(query,
      function (err, snippets) {
        if (err) {
          return console.error(err);
        }
        res.status(200).json({
          snippets: snippets
        });
      });
  },

  // New snippet
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
        snippet: updateobject
      }
    }, {
      upsert: true
    }, function (err) {
      if (err) {
        res.status(400).json({
          snippet: null
        });
        return console.error(err);
      } else {
        res.status(200).json({
          snippet: updateobject
        });
      }
    });
  },

  // Delete
  "delete": function (req, res) {
    usersinfo.findOneAndUpdate({
      'name': 'codesolutions'
    }, {
      $pull: {
        snippet: {
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
