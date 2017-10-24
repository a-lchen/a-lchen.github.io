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
/*
//aws.config.update({
    secretAccessKey: '1CUKv8kGixh9eSbO7kcd+vNPvgUcE0DXnkqfrYtY'
,
    accessKeyId: 'AKIAJGJLPYFT6NFYVO5A',
    region: 'us-west-2'
});*/

/*
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'alexlchen-gallery-photos',
        key: function (req, file, cb) {
            console.log('ping')
            console.log(file);
            console.log(file.s3.Location)
            cb(null, concat(file.originalname)); //use Date.now() for unique file keys
        },
        filename: function( req, file, cb ) {
            cb( null, file.fieldname + '-' + Date.now() + '.jpg'); 
        }
    })
});
*/
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

module.exports = router;
