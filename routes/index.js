var express = require('express');
var router = express.Router();
//var fs = require('fs')
//var util = require('util')
//var mime = require("mime");
const bodyParser = require('body-parser')
//var multer = require('multer')
//var aws = require('aws-sdk')
//var multerS3 = require('multer-storage-s3')
//s3 = new aws.S3();
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.render('index')
});

router.get('/lovebug', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.render('lovebug')
});


router.get('/lovebug-gallery', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.render('lovebug-gallery')
});

router.get('/thoughts', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.render('thoughts')
});

router.get('/syncotrackjackets', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('syncotrackjackets')
});


/*
router.get('/upload', (req, res) => {
    console.log('uploaded, redirecting')
    //add some kind of notifaciotn
    res.redirect('back');
});

router.post('/upload', upload.single('fileInput'), (req, res) => {
    console.log('upload')
    //console.log(req)
    console.log(req.file)
    console.log(req.file.s3.Location)
    //var dataUri = base64Image(req.file.path);
    //console.log(dataUri);
    res.redirect('back')
});

router.get('/image', function (req, res) {
    res.sendfile(path.resolve('./uploads/jenna1.jpg'));
}); 
*/

module.exports = router;
