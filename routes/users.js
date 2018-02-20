var express = require('express');
var router = express.Router();

require('../models/userModel');

var controller = require ("../controller/userCtrl");

router.post('/create_user',function (req, res) {
  controller.create_user(req, res);
});

router.get('/users_list', function(req,res){
  controller.list_all_users(req, res);
});

module.exports = router;
