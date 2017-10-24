var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');


router.get('/', (req, res, next) => {
    console.log('hi')
    res.render('jenna');
});

module.exports = router;
