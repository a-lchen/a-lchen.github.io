var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('jenna');
});

module.exports = router;
