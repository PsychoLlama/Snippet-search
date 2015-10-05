/*globals require*/
/*jslint node: true */

'use strict';

var mongoose = require('mongoose'),
  UserSchema = mongoose.Schema({
    snippet: []
  }),
  usersinfo = mongoose.model('snippetdata', UserSchema);

// Middleware definitions
module.exports = {

  // Serve root file
  index: function (req, res) {
    usersinfo.find({},
      function (err, snippets) {
        if (err) {
          return res.status(400).json("Horrible error! We barely escaped with our lives...");
        }
        if (!snippets[0]) {
          return res.render('index', {
            snippets: []
          });
        }
        res.render('index', {
          snippets: snippets[0].snippet
        });
      });
  },

  // Search snippets
  search: function (req, res) {
    var title = req.body.search,
      query = {
        snippet: {
          $elemMatch: {
            title: new RegExp(title, 'i')
          }
        }
      };

    // Finding the empty snippet array
    usersinfo.find(query,
      function (err, snippet) {
        if (err) {
          return console.error(err);
        }
        res.status(200).json(snippet[0].snippet);
      });
  },

  // New snippet
  codeentered: function (req, res) {
    var updateObject = {
      title: req.body.title,
      codesnippet: req.body.codesnippet,
      description: req.body.description
    };

    // Find the object with the name "codesolutions"
    // Find an array named "snippet"
    // Push "updateObject" to that array
    usersinfo.update({
      name: 'codesolutions'
    }, {
      $push: {
        snippet: updateObject
      }
    }, {
      upsert: true
    }, function (err) {
      if (err) {
        res.status(400).json("Horrible error! Servers burning everywhere.");
        return console.error(err);
      } else {
        res.status(200).json({
          snippet: updateObject
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
