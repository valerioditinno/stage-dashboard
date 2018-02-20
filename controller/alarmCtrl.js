'use strict';

var mongoose = require('mongoose');
var Promise = require('es6-promise').Promise; //fix DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

var Alarm = mongoose.model('Alarm');

exports.list_all_alarms = function(req, res) {

  var now = new Date(); 
  var tenminago = new Date(now.getTime() - 10*60*1000); 

  Alarm.find({timestamp : {$gt:tenminago}}, function(err, alarms) {  //TODO fix date problem
    if (err)
      res.send(err);
    res.json(alarms);
  });
};

exports.create_alarm = function(req, res){
  var new_alarm = new Alarm();
  new_alarm.sensorId = req.body.sensorId;
  new_alarm.type = req.body.type;
  new_alarm.timestamp = req.body.timestamp;

  new_alarm.save(function(err, alarm) {
    if (err)
      res.send(err);
    res.json(alarm);
  });
};

exports.count = function(req, res) {
  return new Promise(function (resolve, reject) {
    Alarm.aggregate({ $group : { _id : "$type", count: { $sum: 1 }  }}, function(err, num) {
      if (err){
        reject(error);
        return;
      }
      resolve(num);
    });
  });
};

/*'Glass', 'Scream', 'Gunshot' */
