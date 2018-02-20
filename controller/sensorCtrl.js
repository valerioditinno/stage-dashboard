'use strict';

var mongoose = require('mongoose');

var Sensor = mongoose.model('Sensor');

exports.list_all_sensors = function(req, res) {
  Sensor.find({}, function(err, sensors) {
    if (err)
      res.send(err);
    res.json(sensors);
  });
};

exports.create_sensor = function(req, res){
  var new_sensor = new Sensor();
  new_sensor.id = req.body.id;
  new_sensor.state = req.body.state;
  new_sensor.model = req.body.model;
  new_sensor.latitude = req.body.latitude;
  new_sensor.longitude = req.body.longitude;

  new_sensor.save(function(err, sensor) {
    if (err)
      res.send(err);
    res.json(sensor);
  });
};
