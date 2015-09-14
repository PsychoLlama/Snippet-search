var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var path = require('path');

app.get('/', function(req,res){
    res.render('index')
});

app.get('/codeadded', function (req, res) {
    res.render('codeadded');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});