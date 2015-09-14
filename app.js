var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/snippletdata/');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',function (callback) {
    var UserSchema = mongoose.Schema({
        Snipplet:Object
    });
    usersinfo = mongoose.model('Snippetinformation', UserSchema);


    app.get('/snippet.json',function(req,res){
        usersinfo.findOne({name:'codesolutions'},function (err, snipp){
            if (err) return console.error(err);
            var snipping = snipp.Snipplet;
            res.write(JSON.stringify(snipping));
        });
    });

    app.get('/', function (req, res) {
            res.render('index');
        });
    });

    app.get('/codeadded', function (req, res) {
        res.render('codeadded');
    });

    app.post('/codeenterd',function(req,res){
        usersinfo.update({'name':'codesolutions'}, {$set:{Snipplet:req.body.added}}, {upsert: true}, function (err) {
            if (err) return console.error(err);
            else
                res.redirect('/')
        });

});//ending of data base on connect

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});