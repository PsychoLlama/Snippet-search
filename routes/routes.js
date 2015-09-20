//adding routes

exports.codeadd = function (req, res) {
    res.render('codeadded');
};

 exports.index = function (req, res) {
    res.render('index', {
        snipplets: ''
    });
};

exports.search =  function (req, res) {
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
};

exports.codeadded = function (req, res) {
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
};
exports.delete = function (req, res) {
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

};