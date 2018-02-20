var express = require('express');
var router = express.Router();

require('../models/sensorModel')
require('../models/alarmModel');

var sensorCtrl = require ("../controller/sensorCtrl");
var socketCtrl = require('../controller/socketCtrl');
var alarmCtrl = require('../controller/alarmCtrl');

router.post('/alarm',function (req, res) {
  //console.log(req.body);
  alarmCtrl.create_alarm(req, res);

  console.log('received alarm!');

  socketCtrl.emitOnTopic("alarm", req.body);

  alarmCtrl.count(req, res).then(function (count) {
    socketCtrl.emitOnTopic("alarmCount", count);
  });
});

router.get('/alarms_list', function(req,res){
  alarmCtrl.list_all_alarms(req, res);
});

router.get('/count', function(req,res){
  alarmCtrl.count(req, res).then(function (count) {
    res.json(count);
  });
});

router.post('/create_sensor',function (req, res) {
  sensorCtrl.create_sensor(req, res);

  socketCtrl.emitOnTopic("sensor", req.body);
});

router.get('/sensors_list', function(req,res){
  sensorCtrl.list_all_sensors(req, res);
});

module.exports = router;
