var express = require('express');
var router = express.Router();
var path = require('path');

var controller = require ("../controller/userCtrl");

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'auth.html'));
  console.log(req.path);
});

router.post('/auth', function(req, res, next) {
  controller.login(req, res);
});

module.exports = router;
