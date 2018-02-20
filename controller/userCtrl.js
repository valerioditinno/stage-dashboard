'use strict';

var mongoose = require('mongoose');

var User = mongoose.model('User');

var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

exports.list_all_users = function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};

exports.create_user = function(req, res){
  var new_user = new User();
  new_user.email = req.body.email;
  new_user.password = req.body.password;

  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.login = function(req, res) {
  User.findOne({ "email" : req.body.email}, function(err, user) {
    if (err)
        res.json(err);
    else{
      if(typeof req.body.password !== 'undefined' && user != null && req.body.password == user.password){
        //create token
        var token = jwt.sign(req.body, config.key, {
          expiresIn: 1440*60 // expires in 24 hours
        });
        
        // return the information including token as JSON
        res.json({
          success: true,
          token: token
        });

      }else{
        res.json({
          success: false,
          token: null
        });
      }
    }
  });
};
