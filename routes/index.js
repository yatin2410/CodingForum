'use strict';
var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var User = require('../models/user');


/* GET home page. */
router.get('/', ensureAuth, function (req, res) {
    res.render('index');
});

function ensureAuth(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/users/login');
    }
}

router.get('/discuss', ensureAuth, function (req, res) {
    res.render('discuss');
});

router.post('/', ensureAuth, upload.any(), function (req, res, next) {
    
    req.user.savefiles.push(req.files[0].filename);
    req.user.filenames.push(req.files[0].originalname);
        req.user.save(function (err, updateduser) {
            if (err) console.log('update save canceled');
            else {
                res.render('index');
            }
        });
    

});

router.get('/code/:id', function (req, res) {

    res.sendfile('C:\\Users\\Yatin Patel\\source\\repos\\Learn\\Learn\\public\\uploads\\' + req.params.id);

});

module.exports = router;
