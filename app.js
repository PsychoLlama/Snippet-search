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
        Snipplet:[]
    });
    usersinfo = mongoose.model('Snippetinformation', UserSchema);



    app.get('/codeadded', function (req, res) {
        res.render('codeadded');
    });

    app.get('/',function(req,res){
       res.render('index',{
           snipplets:''
       })
    });
    app.post('/search',function(req,res){
        var title = req.body.search;
        console.log(req.body);
        usersinfo.findOne({Snipplet:{$elemMatch:{title:new RegExp(title, "i")}}},{Snipplet:{$elemMatch:{title:new RegExp(title, "i")}}},function (err, snipp) {
            console.log(snipp);
            if (err) return console.error(err);
            if(snipp){
                res.render('index',{
                    snipplets:snipp.Snipplet[0]
                });
            }else{
                res.render('index',{
                    snipplets:{}
                });
            }
        })
    });

    app.post('/codeenterd',function(req,res){
        var updateobject = {
            title:req.body.title,
            body:req.body.codesnippet
        };

        usersinfo.update({'name':'codesolutions'},{$push:{Snipplet:updateobject}}, {upsert: true}, function (err) {
            if (err) return console.error(err);
            else
                res.redirect('/')
        });
    });

});//ending of data base on connect

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});




