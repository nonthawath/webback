var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/google', function(req, res, next) {
 
  res.render('index', { title: 'InsertSuccess!!' });
});

module.exports = router;
